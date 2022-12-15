import { Product } from './../model/product';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  save(product: Product): Promise<void> {
    const document = doc (collection(this.firestore, 'Produtos'));
    return setDoc(document, product)
  }


  list(): Observable<Product[]> {
    const contactsCollection = collection(this.firestore, 'Produtos');
    return collectionData(contactsCollection, {idField: 'id'})
    .pipe(
      map(result => result as Product[])
    )
  }

  find(id: string): Observable<Product> {
    const document = doc (this.firestore, `Produtos/${id}`);
    return docSnapshots (document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Product;
      })
    );
  }

  update(product: Product): Promise<void> {
    const document = doc(this.firestore, 'Produtos', product?.id);
    const { id, ...data } = product;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'Produtos',  id);
    return deleteDoc(document);
  }
}

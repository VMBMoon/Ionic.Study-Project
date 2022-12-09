import { Fornecedor } from '../model/fornecedor';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:3000';
const HTTP_OPTIONS = {
  headers: new HttpHeaders (
    {'Content-Type': 'application/json;charset=utf-8'}
  )
};

@Injectable({
  providedIn: 'root'
})

export class FornecedorService {

  constructor(private http: HttpClient) {}

  insertFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(`${API_URL}/Fornecedor`, fornecedor, HTTP_OPTIONS);
  }

  findFornecedor(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${API_URL}/Fornecedor/${id}`);
  }

  getFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${API_URL}/Fornecedor`);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.put(`${API_URL}/Fornecedor/${fornecedor.id}`, fornecedor, HTTP_OPTIONS);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/Fornecedor/${id}`);
  }
}

import { Fornecedor } from './../model/fornecedor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  fornecedorForm!: FormGroup;
  fornecedor!:Fornecedor;
  editable:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit(): void {

      this.fornecedorForm = this.formBuilder.group({
        razao_social: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]],
        endereco: ['', []],
        contato: ['', [Validators.required, Validators.email]]
      });

      this.route.paramMap.subscribe(params => {
        const fornecedorId = +params.get('id')!;

        if(fornecedorId) {
          this.fornecedorService.findFornecedor(fornecedorId).subscribe({
            next: (fornecedorDB: Fornecedor) => {
              this.fornecedor = fornecedorDB;
              this.editable = true;
              this.loadForm();
            },
            error: (err) => console.log(err)
          });
        }
      });

  }

  addFornecedor() {
    const newFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;


    this.fornecedorService.insertFornecedor(newFornecedor)
    .subscribe({
      next: (result:any) => {
        this.fornecedorForm.reset();
        console.info('[AddFornecedor]', result);
        this.router.navigateByUrl('/tabs/tab4');
      },
      error: (error:any) => { console.log(error) }
    });
  }

  loadForm() {
    this.fornecedorForm.patchValue({
      razao_social: this.fornecedor.razao_social,
      cnpj: this.fornecedor.cnpj,
      endereco: this.fornecedor.endereco,
      contato: this.fornecedor.contato
    });
  }
}

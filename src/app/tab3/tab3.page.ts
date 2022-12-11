import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Endereco } from '../model/endereco';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from './../model/fornecedor';
import { CorreiosService } from './../services/correios.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  fornecedorForm!: FormGroup;
  fornecedor!:Fornecedor;
  endereco!: Endereco;
  editable:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute,
    private correiosService: CorreiosService
    ) {}

    ngOnInit(): void {

      this.fornecedorForm = this.formBuilder.group({
        razao_social: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]],
        contato: ['', [Validators.required, Validators.email]],
        endereco: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        bairro: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        localidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
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

  loadEndereco() {
    const cep:string = this.fornecedorForm.get('endereco')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result:Endereco) => {
        this.fornecedorForm.patchValue({
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
          cep: result.cep
        });
      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  editFornecedor() {
    const editFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;
    editFornecedor.id = this.fornecedor.id;

    this.fornecedorService.updateFornecedor(editFornecedor).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab4');
        this.fornecedorForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.fornecedorForm.reset();
      }
    });
  }
}

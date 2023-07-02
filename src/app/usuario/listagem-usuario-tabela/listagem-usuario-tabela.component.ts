import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../shared/modelo/usuario";
import {MatTableDataSource} from "@angular/material/table";
import {UsuarioService} from "../../shared/services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listagem-usuario-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css']
})
export class ListagemUsuarioTabelaComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario>;
  mostrarColunas = ['nome', 'idade', 'cpf', 'acoes'];
  constructor(private usuarioService: UsuarioService, private roteador: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  filtrar(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  apagar(id: string): void {
    console.log('apagando');
    this.usuarioService.apagar(id).subscribe(
      apagado => {
        const indx = this.dataSource.data.findIndex(usuario => usuario.id === id);
        if (indx > -1) {
          this.dataSource.data.splice(indx, 1);
          this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
        }
      }
    );
  }

  // editar(usuario: Usuario): void {
  //   console.log('editando');
  //   this.roteador.navigate(['editausuario', usuario.id]);
  // }
  listagem(){
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  editar(usuario: Usuario): void {
    console.log('editando');
    this.roteador.navigate(['editausuario', usuario.id]);
  }
}

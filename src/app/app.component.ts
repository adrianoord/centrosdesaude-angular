import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

interface DataBase {
  nome: string,
  tipoUnidade:string,
  endereco: string,
  zapCadastro?: string,
  linkCadastro?: string,
  emailCoord?: string,
  equipes: {
      idEquipe?: string,
      cor?: string,
      descricao?: string,
      contatos: {tel_num: string, tel_icon: "zap" | "tel"}[],
      email?: string
  }[],
  servicos: {
      descricao: string,
      contatos: {tel_num: string, tel_icon: "zap" | "tel"}[],
  }[],
  social: {
      rede: "linktree"|"facebook"|"instagram",
      link: string
  }[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  assets_path = environment.assets;
  CSs!: DataBase[];
  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {
    const timedate = new Date();
    fetch(this.assets_path + `cs_data.json?c=${timedate.getTime()}`).then(res => res.json()).then((data: any)=>{
        this.CSs = data;
    });
  }

  focus(event: any) {
    const element: Element = event._body.nativeElement;
    
    setTimeout(()=>{
      if(
        element &&
        element.parentElement &&
        !this.isInViewport(element)) {
          element.parentElement.scrollIntoView({block:'center'});
        }
    }, 200);
  }

  isInViewport(el: Element) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
}

import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import Pokemon from 'pokemon-images';//module pour recupérer les images de pokémons
import 'rxjs/add/operator/map';

@Injectable()
export class myService {
  loading:boolean = false;
}//service pour utiliser une variable globale au projet

@Component({
  providers: [myService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my pokedex';
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  data: any = {};
  type: any = [];
  names: any = [];
  filtre: any = "";
  loading = false;
  img = "";
  err = "";

  constructor(
        private http: Http,
        private service: myService) {
    this.loading = service.loading;
    this.getPokemons();//recupère et traite la liste des pokémons au chargement de la page
  }

  getAllData() {
    return this.http.get(this.apiUrl + '?limit=151&offset=0')
      .map((res: Response) => res.json());
  }//récupère la liste des 151 premiers pokémons  

  getData(url) {
    return this.http.get(url)
      .map((res: Response) => res.json());
  }//récupère les infos d'un pokémon

  getPokemons() {
    this.getAllData().subscribe(data => {
      this.names = [];//vide le tableau pour éviter la duplication à l'affichage
      for (var i = 0; i < data.results.length; i++) {
        let element = data.results[i];
        this.names.push(element.name);
      }//boucle pour mettre les noms de chaque pokemon dans un tableau qui servira pour l'auto-complétion
      this.data = data;
    })
  }//traite la réponse de l'API pour pouvoir afficher la liste des pokémons à l'écran

  getInfoPokemon(url) {
    this.service.loading = false;
    this.data = {};
    this.type = [];
    this.img = "";
    this.getData(url).subscribe(data => {
      this.service.loading = true;
      for(var i = 0; i < data.types.length; i++){
        this.getData(data.types[i].type.url).subscribe(type => {
          this.type.push(type.name);
        })
      }//boucle pour mettre le ou les types d'un pokemon dans un tableau
      this.img = Pokemon.getSprite(data.name);//recupère l'image du pokémon
      this.data = data;
    })
  }//traite la réponse de l'API pour pouvoir afficher les infos d'un pokemon

  search(form: NgForm) {
    this.data = {};
    this.type = [];
    this.err = "";
    this.img = "";
    this.getData(this.apiUrl + this.filtre).subscribe(
      data => {
        this.service.loading = true;
        for(var i = 0; i < data.types.length; i++){
          this.getData(data.types[i].type.url).subscribe(type => {
            this.type.push(type.name);
          })
        }
        this.img = Pokemon.getSprite(data.name);
        this.data = data;
      },
      error => {
          console.log('Error Search');
          this.err = this.filtre;
    })
  }//recherche par id ou name d'un pokémon

  filter() {
    var input, filter, list, li, i;
    input = document.getElementById('search');
    filter = input.value.toLowerCase();
    list = document.getElementById("pokemons");
    li = list.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } 
      else {
          li[i].style.display = "none";
      }
    }//boucle pour filtrer la liste de pokémons par rapport à la saisie du champs de recherche et cacher ceux qui ne correspondent pas à la saisie
    this.filtre = filter;
  }

  // back() {
  //   this.service.loading = false;
  //   this.type = [];
  //   this.getPokemons();
  // }
}

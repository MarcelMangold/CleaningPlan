import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
 shoppingList;
  constructor() { }

  ngOnInit() {
    this.shoppingList = {
        "items":[
            {
                "name":"Test1",
                "finished": false,
                "finishhedBy":"Marcel",
                "created":"01.02.2018",
                "finishedAt":"02.05.2019"
            },
            {
                "name":"Test2",
                "finished": false,
                "finishhedBy":"Marcel",
                "created":"01.02.2018",
                "finishedAt":"02.05.2019"
            },
            {
                "name":"Test3",
                "finished": false,
                "finishhedBy":"Marcel",
                "created":"01.02.2018",
                "finishedAt":"02.05.2019"
            },
            {
                "name":"Test4",
                "finished": false,
                "finishhedBy":"Marcel",
                "created":"01.02.2018",
                "finishedAt":"02.05.2019"
            },

        ]
       

    }
  }

  newItem()
  {
      
  }


}

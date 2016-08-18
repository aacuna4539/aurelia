/**
 * Created by rigel on 8/10/16.
 */

import { computedFrom } from 'aurelia-framework';

export class Sponsors {
    constructor() {
        this.message = "Sponsors";
        setTimeout(() => this.message = "Changed after binding", 3000);
        this.mapCollection = new window.Map();
        this.mapCollection.set('a', 'Alpha');
        this.mapCollection.set('b', 'Beta');
        this.mapCollection.set('c', 'Charlie');
        this.mapCollection.set('d', 'Delta');
        this.styleString = 'background: red;';
        this.styleObject = { background: 'green'};
        this.customerColor = 'purple';
        this.customerStatus = 'bad';
        this.person = new Person();
        this.person.firstName = 'Murray';
        this.person.lastName = 'Rothbard';
        this.trades = [{amount:99.93,time:new Date()}];
        setTimeout(() => this.trades.push({amount:33.54, time: new Date()}), 3000);
    }

    doSomething(a) {
        console.log(a);
    }

    myinterceptor(method, update, value) {
        console.log(value);
        update(value);
    }
}

class Person {
    firstName: 'Murray';
    lastName: 'Rothbard';

    // computedFrom decorator prevents dirty checking.  real use case would be
    // when dealing with many many computed bindings.
    @computedFrom('firstName', 'lastName')
    get fullName() { return this.firstName + ' ' + this.lastName; }
}
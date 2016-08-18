/**
 * Created by rigel on 8/10/16.
 */
import 'bootstrap';
import { ViewLocator } from 'aurelia-framework';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then( a => a.setRoot('shell'));
}

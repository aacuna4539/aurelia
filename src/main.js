/**
 * Created by rigel on 8/10/16.
 */
import 'bootstrap';
import { ViewLocator } from 'aurelia-framework';

export function configure(aurelia) {
    aurelia.use.instance('apiRoot', 'http://');
    aurelia.use.globalResources('common/dateFormat'); // use instead of putting <require from="foo"></require> in templates
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then( a => a.setRoot('shell'));
}

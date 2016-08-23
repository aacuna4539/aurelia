/**
 * Created by rigel on 8/23/16.
 */

/* custom if */

import { BoundViewFactory, ViewSlot, customAttribute, templateController, inject } from 'aurelia-framework';

@customAttribute('my-if')
@templateController
@inject(BoundViewFactory, ViewSlot)
export class If {
    constructor(viewFactory, viewSlot) {
        this.viewFactory = viewFactory; // viewFactory produces instance of markup that custom attr is on
        this.viewSlot = viewSlot; // place in the dom that declaration is at
        this.showing = false;
    }

    bind(bindingContext) {
        this.bindingContext = bindingContext;
    }

    valueChanged(newValue) {
        if (!newValue) {
            if(this.view) {
                this.viewSlot.remove(this.view);
                this.view.unbind();
            }

            this.showing = false;
            return;
        }

        if(!this.view) {
            this.view = this.viewFactory.create();
        }

        if (!this.showing) {
            this.showing = true;

            if(!this.view.bound) {
                this.viewSlot.bind(this.bindingContext);
            }

            this.viewSlot.add(this.view);
        }
    }
}

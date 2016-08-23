/**
 * Created by rigel on 8/23/16.
 */
import {customAttribute, templateController,BoundViewFactory, ViewSlot,inject} from 'aurelia-framework';

@customAttribute('items-control')
@templateController()
@inject(BoundViewFactory, ViewSlot)
export class ItemsControl {
    constructor(boundViewFactory, viewSlot) {
        this.viewFactory = boundViewFactory;
        this.viewSlot = viewSlot;
        this.viewInstances = [];
    }

    valueChanged(newValue) {
        this.viewInstances.forEach( view => {
            this.viewSlot.remove(view);
            view.unbind();
        });
        this.viewInstances = [];
        newValue.forEach(value => {
            let view = this.viewFactory.create();
            view.bind(value);
            this.viewSlot.add(view);
        });
    }
}

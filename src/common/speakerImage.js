/**
 * Created by rigel on 8/23/16.
 */
import {bindable, customAttribute, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImage {
    @bindable imageName;
    @bindable isMvp;
    constructor(element) {
        this.element = element;
    }

    isMvpChanged(newValue) {
        if (newValue) {
            var el = document.createElement("div");
            el.innerHTML = "MVP";
            el.className = "watermark";
            this.element.parentNode.insertBefore(el, this.element.nextSibling)

        }
    }

    imageNameChanged(newValue) {
        this.element.src = '../src/images/speakers/' + newValue;
    }

}
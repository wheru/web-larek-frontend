import { EventEmitter } from "../components/base/events";
import { LarekEvents } from "../types/events";

export class ModalWindowView {
    #container: HTMLElement;
    #content: HTMLElement;
    #event: EventEmitter;

    constructor(event: EventEmitter) {
        this.#container = document.querySelector('#modal-container');
        this.#content = document.querySelector('.modal__content');
        this.#event = event;
        this.#init();
    }

    #init() {
        const close = document.querySelector('.modal__close') as HTMLButtonElement;
        close.onclick = () => this.#event.emit(LarekEvents.MODAL_HIDE);
        this.#container.onclick = (e: MouseEvent) => this.#onOverlayClick(e);
    }

    renderAll({items}: {items: HTMLElement[]}){
        this.#container.classList.add('modal_active');
        document.querySelector('.page').classList.add('page_hidden');
        this.#content.replaceChildren(...items);
        return this.#container;
    }

    renderOne({item}: {item: HTMLElement}){
        this.#container.classList.add('modal_active');
        document.querySelector('.page').classList.add('page_hidden');
        this.#content.replaceChildren(item);
        return this.#container;
    }

    remove() {
        this.#container.classList.remove('modal_active');
        document.querySelector('.page').classList.remove('page_hidden');
        this.#content.replaceChildren('');
    }
  
    #onOverlayClick(e: MouseEvent) {
        if (e.target === this.#container) {
            this.#event.emit(LarekEvents.MODAL_HIDE);
        }
    }
}
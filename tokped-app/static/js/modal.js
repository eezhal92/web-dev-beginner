class AddModal {
  constructor () {
    this.init();
  }

  /**
   * Setup event listeners for closing modal
   */
  init() {
    this.modal = document.querySelector('.modal');
    if (!this.modal) {
      throw new Error('.modal should be present');
    }

    this.modal.querySelector('.close-button').addEventListener('click', () => {
      this.hide();
    });

    this.modal.querySelector('.btn-cancel').addEventListener('click', () => {
      this.hide();
    });
  }

  /**
   * Set css class to make modal hidden
   */
  hide () {
    this.modal.classList.remove('modal--visible');
  }

  /**
   * Set css class to make modal visible
   */
  show() {
    this.modal.classList.add('modal--visible');
    this.modal.querySelector('.form').focus();
  }
}

window.addModal = new AddModal();

//primeiro: importa as bibliotecas, ShowToastEvent p exibir mensagens de toast na tela e NavigationMixin pra permitir a navegação p outras paginas dentro do Salesforce
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ThelastdanceQ4 extends NavigationMixin(LightningElement) {
  @api recordId; //para permitir que ela seja acessada a partir de outros componentes LWC.

  handleSuccess(event) {
    //criando um novo evento p exibir uma mensagem na tela
    const toastEvent = new ShowToastEvent({
      title: 'Lead Criado',
      message: 'O Lead foi criado com sucesso',
      variant: 'success',
    });
    this.dispatchEvent(toastEvent); 


    const recordId = event.detail.id; //extrai o id que foi criado
    this[NavigationMixin.Navigate]({ //navega para a página de exibição desse registro
      type: 'standard__recordPage',
      attributes: {
        recordId: recordId,
        objectApiName: 'Lead',
        actionName: 'view'
      }
    });
  }
  
  //pegamos esse reset da documentação
  clearForm(event) {
        const inputFields = this.template.querySelectorAll( //seleciona todos os campos de entrada no form
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => { //para cada field dentro do inputFields, reseta-los
                field.reset();
            });
        }
  }
}

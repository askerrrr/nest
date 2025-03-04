class CheckBox {
  constructor(checkBoxId, checkBoxValue, divContent) {
    this.checkBoxId = checkBoxId;
    this.checkBoxValue = checkBoxValue;
    this.divContent = divContent;
  }

  new() {
    var input = document.createElement('input');
    input.id = this.checkBoxId;
    input.type = 'checkbox';
    input.name = 'order-status';
    input.value = this.checkBoxValue;

    var div = document.createElement('div');
    div.append(this.divContent);

    var label = document.createElement('label');
    label.for = this.checkBoxId;
    label.append(input, div);

    return label;
  }
}

var A = new CheckBox(1, 'in-processing', 'взят в обработку').new();

var B = new CheckBox(2, 'purchased', 'выкуплен').new();

var C = new CheckBox(3, 'china-warehouse', 'доставлен на склад в китае"').new();

var D = new CheckBox(4, 'on-the-way', 'товар в пути').new();

var E = new CheckBox(5, 'awaiting-receipt', 'ожидает получения').new();

var F = new CheckBox(6, 'order-is-completed', 'заказ завершен').new();

export default async function createCheckBoxForOrderStatus(id) {
  var legend = document.createElement('legend');
  legend.append('Статус заказа');

  var fieldset = document.createElement('fieldset');
  fieldset.id = 'fieldset-' + id;
  fieldset.append(legend, A, B, C, D, E, F);

  var childTeg = document.getElementById('submit-order-status');

  var form = document.getElementById('set-order-status');
  form.insertBefore(fieldset, childTeg);

  return form;
}

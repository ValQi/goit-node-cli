const { program } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./src/contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <value>', 'contact id')
  .option('-n, --name <value>', 'contact name')
  .option('-e, --email <value>', 'contact email')
  .option('-p, --phone <value>', 'contact phone');

program.parse(process.argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      console.table(await listContacts());
      break;

    case 'get':
      console.log(await getContactById(id));
      break;

    case 'add':
      console.log(await addContact(name, email, phone));
      break;

    case 'remove':
      console.log(await removeContact(id));
      break;

    default:
      console.warn('Unknown action!');
  }
};

invokeAction(program.opts());
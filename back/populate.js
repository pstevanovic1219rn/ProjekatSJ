const { sequelize, Users, Locations, Books, Customers, Rentals } = require('./models');

async function main() {
    await sequelize.authenticate();
    let usr;
    let book;
    let loc;
    let cus;
    let rent;

    usr = await Users.create({ name: 'Pera', password: 'Pera123', email: 'pera@gmail.com', admin: true });
    usr = await Users.create({ name: 'Milica', password: 'Milica123', email: 'milica@gmail.com' });
    usr = await Users.create({ name: 'Stefan', password: 'Stefan123', email: 'stefan@gmail.com' });
    usr = await Users.create({ name: 'Ana', password: 'Ana123', email: 'ana@gmail.com' });

    loc = await Locations.create({location: 'Negde 1', name: 'Biblioteka 1',});
    loc = await Locations.create({location: 'Negde 2', name: 'Biblioteka 2',});
    loc = await Locations.create({location: 'Negde 3', name: 'Biblioteka 3',});
    loc = await Locations.create({location: 'Negde 4', name: 'Biblioteka 4',});

    book = await Books.create({ isbn: '9780007136568', name: 'The Two Towers (The Lord of The Rings)', author: 'J.R.R.Tolkein', locationId: 1 });
    book = await Books.create({ isbn: '9780007203581', name: 'The Fellowship of The Ring (The Lord of The Rings)', author: 'J.R.R.Tolkein', locationId: 1 });
    book = await Books.create({ isbn: '9780007123803', name: 'The Return of The King (The Lord of The Rings)', author: 'J.R.R.Tolkein', locationId: 1 });
    book = await Books.create({ isbn: '9780261102217', name: 'The Hobbit', author: 'J.R.R.Tolkein', locationId: 2 });

    cus = await Customers.create({name: 'Nikola', lastName: 'Nikolic', phone: '060 555 47 82'});
    cus = await Customers.create({name: 'Uros', lastName: 'Urosevic', phone: '061 555 76 03'});
    cus = await Customers.create({name: 'Teodora', lastName: 'Teodorovic', phone: '063 555 25 33'});
    cus = await Customers.create({name: 'Pera', lastName: 'Peric', phone: '069 555 42 05'});

    rent = await Rentals.create({bookId: 1, customerId: 1});
    rent = await Rentals.create({bookId: 2, customerId: 1});
    rent = await Rentals.create({bookId: 3, customerId: 1});
    rent = await Rentals.create({bookId: 4, customerId: 2});

    await sequelize.close();
}

main();
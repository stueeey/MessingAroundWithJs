require("linqjs");

var Book = function (_name, _price) {

    var priceChanging = [];
    var priceChanged = [];
    
    Object.defineProperties(this,
    {
        name:
        {
            get: () => { _name },
            set: (val) => 
            { 
                console.log(val); 
                _name = val;
            }
        },
        price:
        {
            get: () => { _price },
            set: (val) => 
            { 
                if (val != _price && priceChanging.all(p => !p(this, val)))
                {
                    _price = val;
                    priceChanged.forEach(handler => handler(this));
                }
                console.log(val); 
                _price = val;
            } 
        }
    });

	this.onPriceChanging = function (callback) {
        priceChanging.push(callback);
	};

	this.onPriceChanged = function (callback) {
        priceChanged.push(callback);
	};
};

var book = new Book('JavaScript: The Good Parts', 23.99);
book.name = 'book name';
console.log('The name is: '+ book.name);

console.log('The price is: $' + book.price);

book.onPriceChanging(function (b, price) {
	if (price > 100) {
		console.log('System error, price has gone unexpectedly high');
		return false;
	}
	return true;
});

book.onPriceChanged(function (b) {
	console.log('The book price has changed to: $' + b.price);
});

book.price = 19.99;

book.price = 200;
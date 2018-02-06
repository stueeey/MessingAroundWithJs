require("linqjs");

var Book = function (name, price) {
    
    var priceChanging = [];
    var priceChanged = [];
    
    this.name = function (val) {
        if (val != undefined)
            name = val;
        return name;
	};

	this.price = function (val) {
        if (val != undefined && val != price)
        {
            //if (Enumerable.From(priceChanging).All("h => h(this, val)"))
            if (priceChanging.any(p => !p(this, val)))
            {
                return price;
            }
            price = val;
            priceChanged.forEach(handler => handler(this));
        }
        return price;
	};

	this.onPriceChanging = function (callback) {
        priceChanging.push(callback);
	};

	this.onPriceChanged = function (callback) {
        priceChanged.push(callback);
	};
};

var book = new Book('JavaScript: The Good Parts', 23.99);
book.name('book name');
console.log('The name is: '+ book.name());

console.log('The price is: $' + book.price());

book.onPriceChanging(function (b, price) {
	if (price > 100) {
		console.log('System error, price has gone unexpectedly high');
		return false;
	}
	return true;
});

book.onPriceChanged(function (b) {
	console.log('The book price has changed to: $' + b.price());
});

book.price(19.99);

book.price(200);
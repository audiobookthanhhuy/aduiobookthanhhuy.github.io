(function(){function c(a){this.t=a}function l(a,b){for(var e=b.split(".");e.length;){if(!(e[0]in a))return!1;a=a[e.shift()]}return a}function d(a,b){return a.replace(h,function(e,a,i,f,c,h,k,m){var f=l(b,f),j="",g;if(!f)return"!"==i?d(c,b):k?d(m,b):"";if(!i)return d(h,b);if("@"==i){e=b._key;a=b._val;for(g in f)f.hasOwnProperty(g)&&(b._key=g,b._val=f[g],j+=d(c,b));b._key=e;b._val=a;return j}}).replace(k,function(a,c,d){return(a=l(b,d))||0===a?"%"==c?(new Option(a)).innerHTML.replace(/"/g,"&quot;"):
a:""})}var h=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,k=/\{\{([=%])(.+?)\}\}/g;c.prototype.render=function(a){return d(this.t,a)};window.t=c})();
// end of 't';

Number.prototype.to_$ = function () {
  return "$" + parseFloat( this ).toFixed(2);
};
String.prototype.strip$ = function () {
  return this.split("$")[1];
};

var app = {

  shipping : 5.00,
  products : [
      {
        "name" : "THE ART CITY",
        "price" : "50",
        "img" : "image/book-1.png",
        "desc" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      },
      {
        "name" : "GIVE THANKS",
        "price" : "100",
        "img" : "image/book-2.png",
        "desc" : "You decide"
      },
      {
        "name" : "YOUR NAME",
        "price" : "75",
        "img" : "image/book-3.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "YOUR TITLE GOES HERE",
        "img" : "image/book-4.png",
        "price" : "85",
        "desc" : "Don't get tired!"
      },
      {
        "name" : "MUSIC ROCK",
        "price" : "20",
        "img" : "image/book-5.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "SAMPLE TEXT",
        "price" : "35",
        "img" : "image/book-6.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "SAWPLE TEXT",
        "price" : "68",
        "img" : "image/book-7.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "BLACK HISTERT MONTH",
        "price" : "80",
        "img" : "image/book-8.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "LOVE",
        "price" : "90",
        "img" : "image/book-9.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      {
        "name" : "RETRO",
        "price" : "50",
        "img" : "image/book-10.png",
        "desc" : "Always stay up-to-date with this very useless shower curtain!"
      },
      
    ],

  removeProduct: function () {
    "use strict";

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout( function () {
      item.remove();
      app.updateTotals();
    }, 500); // Time out css
  },

  addProduct: function () {
    "use strict";

    var qtyCtr = $(this).prev(".product-qty"),
        quantity = parseInt(qtyCtr.html(), 10) + 1;

    app.updateProductSubtotal(this, quantity);
  },

  subtractProduct: function () {
    "use strict";

    var qtyCtr = $(this).next(".product-qty"),
        num = parseInt(qtyCtr.html(), 10) - 1,
        quantity = num <= 0 ? 0 : num;

    app.updateProductSubtotal(this, quantity);
  },

  updateProductSubtotal: function (context, quantity) {
    "use strict";

    var ctr = $(context).closest(".product-modifiers"),
        productQtyCtr = ctr.find(".product-qty"),
        productPrice = parseFloat(ctr.data("product-price")),
        subtotalCtr = ctr.find(".product-total-price"),
        subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html( subtotalPrice.to_$() );

    app.updateTotals();
  },

  updateTotals: function () {
    "use strict";

    var products = $(".shopping-cart--list-item"),
        subtotal = 0,
        shipping;

    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat( $(products[i]).find(".product-total-price").html().strip$() );
    }

    shipping = (subtotal > 0 && subtotal < (100 / 1.06)) ? app.shipping : 0;

    $("#subtotalCtr").find(".cart-totals-value").html( subtotal.to_$() );
    $("#taxesCtr").find(".cart-totals-value").html( (subtotal * 0.06).to_$() );
    $("#totalCtr").find(".cart-totals-value").html( (subtotal * 1.06 + shipping).to_$() );
    $("#shippingCtr").find(".cart-totals-value").html( shipping.to_$() );
  },

  attachEvents: function () {
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);
  },

  setProductImages: function () {
    "use strict";

    var images = $(".product-image"),
        ctr,
        img;

    for (var i = 0; i < images.length; i += 1) {
      ctr = $(images[i]),
      img = ctr.find(".product-image--img");

      ctr.css("background-image", "url(" + img.attr("src") + ")");
      img.remove();
    }
  },

  renderTemplates: function () {
    "use strict";

    var products = app.products,
        content = [],
        template = new t( $("#shopping-cart--list-item-template").html() );

    for (var i = 0; i < products.length; i += 1) {
      content[i] = template.render(products[i]);
    }

    $("#shopping-cart--list").html(content.join(""));
  }

};

app.renderTemplates();
app.setProductImages();
app.attachEvents();

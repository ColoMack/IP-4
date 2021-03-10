function Pizza(size, crust) {
  this.size = size;
  this.crust = crust;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.cost = function() {
  var price = 0;
  if(this.size == "small") {
      price += 500;
  } else if (this.size == "medium") {
      price += 80;
  } else {
      price += 1000;
  }

  for (var i = 0; i < this.toppings.length; i++) {
      price += 100;
  }
  if (this.crust == "thin"){
      price += 300;
  }else if (this.crust == "broklyn") {
      price += 500;
  }else {
      price += 700;
  }
  this.price = price;
}

Pizza.prototype.toppingsList = function() {
  if (this.toppings.length > 0) {
      return this.toppings.join(", ");
  } else {
    return "None";
  
$(document).ready(function() {
  var total = 0;
  $(".total").text(total);
  $("#pizza-size").submit(function(event) {
      event.preventDefault();
      var crust = $("#crust").val();
      var size = $("#size").val();
      var newPizza = new Pizza(size, crust);

      $("input:checkbox[name=topping]:checked").each(function() {
          var toppingChoice = $(this).val();
          newPizza.toppings.push(toppingChoice);
      });

      newPizza.cost();
      total += newPizza.price;

      $(".total").text(total);
      $(".cart").show();;
      $("#cartHeader").show();
      $("ol#cart").append("<li><span class='cartItem'>" + newPizza.size + " " + newPizza.crust + " Pizza" + "</span></li>");

      $(".cartItem").last().click(function() {
          $("#pick-pizza").show();
          $(".size").text(newPizza.size);
          $(".crust").text(newPizza.crust);
          $(".toppings").text(newPizza.toppingsList());
          $(".cost").text(newPizza.price);
      });
      $("#pizza")[0].reset();
  });

  $("button#checkout").click(function() {
      $("#pick-pizza").hide();
      $(".pickup-delivery").show();
  });

  $("button#pickup").click(function() {
      $(".pickup-delivery").hide();
      $(".pick-up").show();
  });

  $("button#button-pickup").click(function(event) {
      event.preventDefault();
      var userName = $("input#pick-upName").val();
      $(".name-input").text(userName);
      $("form#pickup-up-name").hide();
      $(".cart").hide();
      $("form#pizza").hide();
      var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
      if (userName){
          $("#modal-body").html(" Hello " + userName + ", you may pick your order");
          $("#modalLabel").html("Your Order has been successfully confirmed.");
          myModal.show();
      } else {
          $("#modal-body").html("Please enter your name");
          $("#modalLabel").html("Invalid input!");
           myModal.show();
      }
  });

  $("button#delivery").click(function() {
      total += 300;
      $(".total").text(total);
      $(".pickup-delivery").hide();
      $(".deliveryNow").show();
  });

  $("button#submitDeliveryForm").click(function(event) {
      event.preventDefault();
      var userName = $("input#deliveryName").val();
      var address = $("input#address").val();
      $(".cart").hide();
      $("form#pizza").hide();
      $("form#deliveryForm").hide();
      var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
      if (userName && address){
          $("#modal-body").html(" Hey " + userName + ", we have received your order and it will be delivered soon. Welcome again to ARINGO");
          $("#modalLabel").html("Your Order has been successfully confirmed.");
          myModal.show();
      } else {
          $("#modal-body").html("Please enter name and address!!");
          $("#modalLabel").html("Invalid input!");
           myModal.show();
      }
  });
};
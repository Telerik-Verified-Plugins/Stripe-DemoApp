(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        createCustomer: function () {
            if (!this.checkSimulator()) {
                // https://stripe.com/docs/api#create_customer
                stripe.customers.create(
                    {
                        description : "John Doe",
                        email :  "john@telerik.com"
                    },
                    function (response) {alert("Customer created:\n\n" + JSON.stringify(response))},
                    this.onError
                );
            }
        },

        listCustomers: function () {
            if (!this.checkSimulator()) {
                // https://stripe.com/docs/api#list_customers
                stripe.customers.list(
                    {
                        limit : "2" // both value as string and number are supported
                    },
                    function (response) {alert(JSON.stringify(response))},
                    this.onError
                );
            }
        },

        updateCustomer: function () {
            if (!this.checkSimulator()) {
                // https://stripe.com/docs/api#list_customers
                stripe.customers.list(
                    {
                        limit : 1
                    },
                    function (response) {
                        if (response.data.length == 0) {
                            alert("Please create a customer first.");
                        } else {
                            // https://stripe.com/docs/api/curl#update_customer
                            alert("Updating the description of customer with id: " + response.data[0].id)
                            stripe.customers.update(
                                response.data[0].id,
                                {
                                    description : "Updated at " + new Date()
                                },
                                function(response) {
                                    alert("Customer updated:\n\n" + JSON.stringify(response));
                                },
                                this.onError
                            );
                        }
                    }
                );
            }
        },

        deleteCustomer: function () {
            if (!this.checkSimulator()) {
                // https://stripe.com/docs/api#list_customers
                stripe.customers.list(
                    {
                        limit : 1
                    },
                    function (response) {
                        if (response.data.length == 0) {
                            alert("Please create a customer first.");
                        } else {
                            // https://stripe.com/docs/api#delete_customer
                            alert("Removing customer with id: " + response.data[0].id)
                            stripe.customers.remove(
                                response.data[0].id,
                                function(response) {
                                    alert("Customer removed:\n\n" + JSON.stringify(response));
                                },
                                this.onError
                            );
                        }
                    }
                );
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.stripe  === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },
        
        onError: function(msg) {
            alert('Stripe plugin error:\n\n' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);
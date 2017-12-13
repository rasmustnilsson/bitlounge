var itemFlow = new Vue({
    el: "#itemContainer",
    data: {
        items: [],
        loadCounter: 0,
        filter: 'new',
        outOfItems: false,
    },
    methods: {
        showNoMoreItems: function() {
            this.outOfItems = true;
        },
        loadMoreItems() {
            axios.post(getItemsRoute, {
                filter: this.filter,
                loadCounter: this.loadCounter,
            })
            .then(function(response) {
                if(response.data.length == 0) return itemFlow.showNoMoreItems();
                itemFlow.loadCounter++;
                itemFlow.items = itemFlow.items.concat(response.data);
            })
        },
        removeItem: function(index) {
        },
    }
})

axios.post(getItemsRoute, {
    filter: 'new',
    loadCounter: 0,
})
.then(function(response) {
    if(response.data.length == 0) return itemFlow.showNoMoreItems();
    itemFlow.items = response.data;
    itemFlow.loadCounter++;
})

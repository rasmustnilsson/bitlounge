let createItem = new Vue({
    el: '#newItemForm',
    data: {
        tags: [],
        tagInputField: '',
        name: '',
        price: '',
        isUnlisted: false,
    },
    methods: {
        createTag: function() {
            if(this.tagInputField.replace(/\s+/g, '') == '' || this.tags.includes(this.tagInputField.replace(/\s+/g, ''))) return this.tagInputField = '';
            this.tags.push(this.tagInputField);
            this.tagInputField = '';
        },
        removeTag: function(index) {
            this.tags.splice(index,1);
        },
        submit: function() {
            if(this.name == '' || this.price == '') return false;
            axios.post('/addItem', {
                name: this.name,
                price: this.price,
                tags: this.tags,
                isUnlisted: this.isUnlisted,
            }).then(function() {
                window.location.href = '/';
            })
        }
    }
})

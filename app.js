//导航栏组件
Vue.component('my-nav', {
    props: ['data'],
    template: "<a v-on:click='getData(data.mark)' style='margin:0 10px;'>{{data.text}}</a>",
    methods: {
        getData: function(url) {
            this.$http.get(url)
                .then(function(res) {
                    console.log(res.data.data[0]);
                    vm.listArr = res.data.data;
                    vm.isListShow = true;
                    vm.isDetailShow = false;
                })
                .catch(function(err) {
                    console.log(err);
                });            
        }
    }
});

//内容列表组件
Vue.component('my-list', {
    props: ['data'],
    template: "<div class='item'><a href='#'><img :src=data.author.avatar_url class='logo'></img></a><a :detailid=data.id class='title' v-on:click='getDetail'>{{data.title}}</a></div>",
    methods: {
        getDetail: function(event) {
            var id = event.target.getAttribute("detailid");
            this.$http.get('https://cnodejs.org/api/v1/topic/' + id)
                .then(function(res) {
                    console.log(res.data);
                    vm.detail = res.data.data;
                    vm.isListShow = false;
                    vm.isDetailShow = true;
                })
                .catch(function(err) {
                    console.log(err);
                });  
        }
    }
});

//内容详情组件
Vue.component('my-detail', {
    props: ['data'],
    template: '<div v-html="data.content"></div>'
});
var baseUrl = 'https://cnodejs.org/api/v1/topics';
var initUrl = baseUrl+'/?limit=20';
var navArr = [{
                mark: baseUrl+'/?tab=all',
                text: '全部'
            }, {
                mark: baseUrl+'/?tab=ask',
                text: '问答'
            }, {
                mark: baseUrl+'/?tab=share',
                text: '分享'
            }, {
                mark: baseUrl+'/?tab=job',
                text: '招聘'
            }, {
                mark: baseUrl+'/?tab=good',
                text: '精华'
            }];

//实例化Vue            
var vm = new Vue({
    el: '#app',
    data: {
        //导航栏内容
        navArr: navArr,
        //列表内容
        listArr: [],
        //详情内容
        detail: null,
        //是否渲染列表页面
        isListShow: true,
        //是否渲染详情页面
        isDetailShow: false,
    },
    methods: {
    },
    created: function() {
        this.$http.get(initUrl)
            .then(function(res) {
                vm.listArr = res.data.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
});


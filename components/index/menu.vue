<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="wrapper_leave">
            <dt>全部分类</dt>
            <dd v-for="(item,idx) in menu" 
                :key="idx"
                @mouseenter="list_enter"
            > 
                <i :class="item.type">{{item.name}}</i>
                <span class="arrow"/>
            </dd>
        </dl>
        <div class="detail"
            v-if="kind" 
            @mouseenter="item_enter" 
            @mouseleave="item_leave">
            <template v-for="(item,idx) in curdetail.child">
                <h4 :key="idx">{{item.title}}</h4>
                <span v-for="v in item.child" :key="v">{{v}}</span>
            </template>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            kind:'',
            menu: [{
                type: 'food',
                name: '美食',
                child:[{
                    title:'美食',
                    child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
                }]
            },{
                type: 'takeout',
                name: '外卖',
                 child:[{
                    title:'外卖',
                    child:['美团外卖']
                }]
            },{
                type: 'hotel',
                name: '酒店',
                 child:[{
                    title:'酒店',
                    child:['经济','舒适/三星','高档','豪华']
                }]
            }
            ]
        }
    },
    computed: {
        curdetail:function(){
            return this.menu.filter((item) => item.type === this.kind)[0]
        }
    },
    methods:{
        wrapper_leave:function(){
            let self = this;
            self._timer= setTimeout(function() {
                self.kind = ''
            },150)
        },
        list_enter: function(e) {
            this.kind = e.target.querySelector('i').className;
        },
        item_enter: function () {
            clearTimeout(this._timer)
        },
        item_leave: function () {
            this.kind = ''
        }
    }
}
</script>

<style>

</style>

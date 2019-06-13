<template>
    <div class="m-crumbs">
        <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">三亚美团</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/products', query: {keyword:typeZh} }">三亚{{typeZh}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{keyword}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: '丽人'
        }
    },
    computed: {
        typeZh(){
            switch(this.type) {
                case 'children':
                    return '儿童'
                    break;
                case 'hotel':
                    return '酒店'
                    break;
                case 'beauty':
                    return '丽人'
                    break;    
                case 'entertainment':
                    return '娱乐'
                    break;    
                case 'married':
                    return '婚礼'
                    break;    
                case 'food':
                    return '美食'
                    break;    
                case 'domestic':
                    return '家居'
                    break;    
                case 'fitness':
                    return '瘦身'
                    break;    
                case 'education':
                    return '教育'
                    break;    
                case 'cinema':
                    return '摄影'
                    break;    
                case 'easylife':
                    return '生活'
                    break;    
                case 'travel':
                    return '旅行'
                    break;    
                default:
                    return '丽人'
            } 
        }
    }

}
</script>

<style>
</style>

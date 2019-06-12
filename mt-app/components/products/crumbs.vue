<template>
    <div class="m-crumbs">
        <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">三亚美团</el-breadcrumb-item>
                <el-breadcrumb-item>三亚{{keyword}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
</style>

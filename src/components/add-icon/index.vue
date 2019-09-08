<template>
    <button
        class="btn-add"
        :class="{active: addActive}"
        @click="addCard"
    >
        <span class="btn-add-icon">+</span>
    </button>
</template>

<script>
export default {
    name: 'AddIcon',
    data() {
        return {
            addActive: false,
        };
    },
    methods: {
        addCard() {
            this.$emit('click');
            this.addActive = true;
            setTimeout(() => this.addActive = false, 400);
        }
    }
};
</script>

<style lang="scss" scoped>
    .btn-add {
        position: relative;
        margin-left: 22px;
        width: 36px;
        height: 36px;
        font-size: 26px;
        font-weight: bold;
        color: #ffffff;
        border-radius: 50%;
        background-color: #d7d7d7;
        vertical-align: middle;
        transition: transform .3s ease;

        &:hover {
            transform: scale(1.2);
            background-color: #6bb53f;
        }

        &.active .add-icon {
            animation: rotateIn .4s ease;
        }

        .add-icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
</style>

<template>
    <div class="search-box">
        <input type="text" name="" id="" class="search"
               v-model="searchText"
               @focus="searchActive = true"
               @blur="searchActive = false"
        >
        <svg
            viewBox="0 0 16 16"
            class="search-icon"
            :class="{active: searchActive}"
            width="16"
            height="16"
            aria-hidden="true"
            data-reactid="26"
        ><title data-reactid="27"></title>
            <g data-reactid="28">
                <path
                    d="M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z"></path>
            </g>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                searchText: '',
                searchActive: false,
            }
        },
        watch: {
            searchText(val) {
                this.$store.commit('searchTextChange', val)
            }
        }
    };
</script>

<style lang="scss" scoped>
    .search-box {
        position: fixed;
        left: 80px;
        bottom: 14px;
        width: 400px;
        height: 30px;

        .search {
            width: 100%;
            padding: 0 10px;
            height: 30px;
            font-size: 14px;
            text-indent: 18px;
            border-radius: 6px;
            color: #1e8ae8;
            font-style: italic;
            font-weight: bold;
            background-color: #ebebeb;

            &:focus {
                color: #666;
                font-style: normal;
                font-weight: normal;
                background-color: #ffffff;
                box-shadow: 0 2px 4px 3px rgba(255, 255, 255, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.08);
            }
        }

        .search-icon {
            position: absolute;
            top: 7px;
            left: 8px;
            width: 16px;
            height: 16px;
            fill: #afbdcf;
        }
    }
</style>

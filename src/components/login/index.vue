<template>
    <div class="login-wrapper">
        <el-button
            v-if="!profile"
            class="header-btn-login"
            icon="el-icon-s-custom"
            @click="popLoginBox(true)"
        >{{ 'User Login' }}
        </el-button>
        <button
            v-else
            :style="{
                backgroundImage: `url(${profile.avatar})`
            }"
            class="avatar"
        >
            <span class="menu">
                <button class="btn">我的主页</button>
                <button class="btn">设置</button>
                <button class="btn"
                        @click.stop="exitLogin"
                >退出</button>
            </span>
        </button>
        <transition name="fade">
            <div class="login-box-wrap" v-show="loginShow">
                <div class="login-box" @click.stop="">
                    <h2 class="title">Color Tree</h2>
                    <h3 class="subtitle">High-performance knowledge management tools</h3>
                    <div class="username">
                        <input
                            class="input"
                            type="text"
                            v-model.trim="mobilePhoneNumber"
                            placeholder="Phone Number"
                            @focus="error.mobilePhoneNumberShow = false"
                            @keydown.enter="login"
                            ref="mobilePhoneNumberInput"
                        >
                        <button class="btn-get-code" @click="getCode">
                            {{ getCodeText }}
                        </button>
                        <transition name="quick-fade">
                            <p class="error" v-show="error.mobilePhoneNumberShow">{{ error.mobilePhoneNumber }}</p>
                        </transition>
                    </div>
                    <div class="password">
                        <input
                            class="input"
                            type="password"
                            v-model.trim="verificationCode"
                            placeholder="verification code"
                            @focus="error.verifyCodeShow = false"
                            @keydown.enter="login"
                        >
                        <transition name="fade">
                            <p class="error" v-show="error.verifyCodeShow">{{ error.verificationCode }}</p>
                        </transition>
                    </div>
                    <button
                        class="btn-login"
                        :class="{
                            on: isSend
                            }"
                        @click="login">Login{{ isSend ? 'ing' : '' }}
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {setToken} from '@libs/token';
    import {mapState} from 'vuex';

    export default {
        name: 'Login',
        data() {
            return {
                mobilePhoneNumber: '',
                verificationCode: '',
                error: {
                    mobilePhoneNumber: '',
                    mobilePhoneNumberShow: false,
                    verificationCode: '',
                    verifyCodeShow: false,
                },
                isSend: false,
                getCodeTime: 0,
                testCode: '',
            };
        },
        computed: {
            ...mapState(['loginShow', 'profile']),

            getCodeText() {
                if (this.getCodeTime <= 0) {
                    return 'Get Verification Code';
                }

                return `${this.getCodeTime}s`;
            },
        },
        methods: {
            getCode() {
                if (this.getCodeTime > 0) return;

                if (!/^\d{11}$/.test(this.mobilePhoneNumber)) {
                    this.$message.error('手机号错误');
                    return;
                }
                this.countdown(60);
                this.post('/mobile_captcha', {
                    type: 'Login',
                    mobile: this.mobilePhoneNumber,
                }).then(({message, testCode}) => {
                    this.$message.success(message);
                    this.testCode = testCode;
                });
            },

            countdown(time) {
                if (time >= 1) {
                    this.getCodeTime = time;
                    setTimeout(() => {
                        this.countdown(time - 1);
                    }, 1000);
                    return;
                }
                this.getCodeTime = 0;
            },

            login() {
                if (this.isSend) {
                    return;
                }

                this.isSend = true;
                this.post('/auth', {
                    api_token: true,
                    mobile: this.mobilePhoneNumber,
                    mobile_captcha: this.verificationCode,
                }).then(({api_token}) => {
                    this.isSend = false;
                    setToken(api_token);
                    this.get('/profile').then(data => this.$store.commit('setProfile', data));
                }).catch(res => {
                    this.isSend = false;
                    const data = res.data;
                    const message = data.message;
                    if (res.status === 422) {
                        if (message.mobilePhoneNumber) {
                            this.error.mobilePhoneNumber = message.mobilePhoneNumber[0];
                            this.error.mobilePhoneNumberShow = true;
                        }
                        if (message.verificationCode) {
                            this.error.verificationCode = message.verificationCode[0];
                            this.error.verifyCodeShow = true;
                        }
                    }
                    if (res.status === 401) {
                        this.error.mobilePhoneNumber = message;
                        this.error.mobilePhoneNumberShow = true;
                    }
                });
            },

            exitLogin() {
                localStorage.removeItem('token');
                this.$store.commit('exitLogin');
            },

            popLoginBox(bool) {
                this.$store.commit('loginShow', bool);
            },
        },
        watch: {
            loginShow(val) {
                if (val) {
                    this.$nextTick(() => this.$refs.mobilePhoneNumberInput.focus());
                }
            },
        },
    };
</script>

<style lang="scss" src="./index.scss" scoped></style>

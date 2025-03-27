<script setup>
import QRCode from 'qrcode'
import { ref, computed, onMounted} from 'vue'
// components
import Wrapper from '@/components/wrapper/Wrapper.vue'

import './Home.scss'
 
const qrCodeUrlName = ref('')
const qrCodeUrl = ref('')
const qrCodeImage = ref('')
const qrCodeDownload = ref('')

const isFocused = ref(false)
const errorValidation = ref({ active: false, msg: '' })
const URL_Validation = ref(false)

const buttons = ref([
    { id: 'downloadPNGBtn', type: 'png', class: ``, html: `Download .png`, },
    { id: 'downloadSVGBtn', type: 'svg', class: ``, html: `Download .svg`, }
])

// onMounted(() => {
//     console.log('window', window.self.innerHeight, window.top)
// })

const onFocus = () => {
    isFocused.value = true;
    errorValidation.value = { active: false, msg: '', }

    if(qrCodeUrl.value.length < 2) {
        URL_Validation.value = true;
    } else {
        URL_Validation.value = false; 
    }
    console.log('onFocus')

    // if(url.value.length > 0) {
    //     setInterval( () => {
    //         console.log('onFocus console')
    //     }, 1000);
    // }
};

const onBlur = () => {
    if(qrCodeUrl.value.length > 0) {
        isFocused.value = true;
        
    } else {
        isFocused.value = false;
    }
    console.log('onBlur')
};

const createQRCode = () => {
    console.log('createQRCode', url.value)

    if(!qrCodeUrl.value.includes('www.') && !qrCodeUrl.value.includes('http')){
        console.log('not includes www')
        errorValidation.value = { active: true, msg: 'Potential link issue.', }
        setTimeout( () => {
            errorValidation.value = { active: false, msg: '', }
        }, 5000)
        errorValidation.value = { active: true, msg: 'Potential link issue.', }
    } else {
        qrCodeUrlName.value = qrCodeUrl.value.replace("http://", "").replace("https://", "").replace("www.", "")

        // With promises 
        QRCode.toDataURL(qrCodeUrl.value)
            .then(url => {
                qrCodeDownload.value = url
                console.log('URL: ', url)
            })
            .catch(err => {
                console.error(err)
            })

        // canvas    
        QRCode.toCanvas(
            document.getElementById('canvas'),
            qrCodeUrl.value, 
            { toSJISFunc: QRCode.toSJIS }, 
            function (error) {
                if (error) console.error(error)
                console.log('success!', QRCode)
            }
        )

        // SVG
        QRCode.toString(qrCodeUrl.value, { type:'svg' }, 
            function (err, svg) {
                console.log('qrcode as svg', svg)
                qrCodeImage.value = svg
            }
        )

        // With async/await
        // const generateQR = async text => {
        //     try {
        //         console.log(await QRCode.toDataURL(text))
        //     } catch (err) {
        //         console.error(err)
        //     }
        // }
        
        errorValidation.value = { active: false, msg: '', }
        qrCodeUrl.value = ''
        onBlur()
    }

}

const download = (btn) => {

    if( btn.type === 'svg' ){
        // download SVG QRcode
        console.log('download', btn.id)
        setTimeout( () => {
            const svg = document.getElementById("rhombus");
            const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
            const a = document.createElement('a');
            const e = new MouseEvent('click');
            a.download = 'QRcode.svg';
            a.href = 'data:image/svg+xml;base64,' + base64doc;
            a.dispatchEvent(e);
        }, 10)
    } else if ( btn.type === 'png' ){
        setTimeout( () => {
            console.log('download', btn.id)
            const canvas = document.getElementById("canvas");
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            const my_evt = new MouseEvent('click');
            a.download = 'QRcode.png';
            a.href = dataURL;
            a.dispatchEvent(my_evt);
        }, 10)
    }

    // qrCodeDownload.value = ''
}

</script>

<template>
    <Wrapper class="home">
        <template #body>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2 class="mb-4">Create your own QR code in seconds</h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-10 d-grid grid-md-2 mx-auto">
                        <div class="col">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <form class="form" @submit.prevent>
                                        <div class="form-field mb-1">
                                            <span v-if="errorValidation.active" class="errorMsg">Invalid URL</span>
                                            <input 
                                                type="text" 
                                                id="url"
                                                placeholder=""
                                                autocomplete="url" 
                                                v-model="qrCodeUrl"
                                                @focus="onFocus" @blur="onBlur"
                                                :class="['', isFocused ? 'focused' : '', errorValidation.active ? 'error' : '']"
                                            />
                                            <label :class="['', isFocused ? 'focused' : '', errorValidation.active ? 'error' : '']">Enter your website link</label>
                                            <!-- <span v-if="errorValidation.active" v-html="errorValidation.msg" class=""></span> -->
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mb-4">
                                                <h5 class="clr-copy">www.example.com</h5>
                                            </div>
                                        </div>

                                        
                                        <div class="form-field">
                                            <button class="btn btn-submit" @click="createQRCode()">
                                                Create QR Code
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col" >
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <!-- <h3 v-html="qrCodeUrlName"></h3> -->

                                    <div class="qrcode">
                                        <img v-if="!qrCodeDownload" src="@/assets/qrcode.png" />
                                        <div v-if="qrCodeImage" id="rhombus" v-html="qrCodeImage"></div>
                                        <canvas id="canvas"></canvas>
                                    </div>
                                </div>

                                <div class="col-12" v-if="qrCodeDownload">
                                    <button v-for="(btn, index) in buttons" :key="index" :id="btn.id" :class="['btn', btn.class]" @click="download(btn)">
                                        <label v-html="btn.html"></label>
                                    </button> 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Wrapper>
</template>


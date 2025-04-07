<script setup>
import QRCode from 'qrcode' 
// https://www.youtube.com/watch?v=X6MFUagtKiQ&t=334s&ab_channel=dcode 
// https://www.npmjs.com/package/qrcode#todataurltext-options-cberror-url
import { ref, computed, onMounted} from 'vue'
// components
import Wrapper from '@/components/wrapper/Wrapper.vue'

import DownloadIcon from '@/assets/icons/download.vue'

import './Home.scss'
 
const qrCodeUrlName = ref('')
const qrCodeUrl = ref('')
const qrCodeImage = ref('')
const qrCodeDownload = ref('')

const isFocused = ref(false)
const errorValidation = ref({ active: false, msg: '' })
const URL_Validation = ref(false)

const items = ref([
    { id: 'downloadPNGBtn', active: true, type: 'png', class: ``, html: `QRcode.png`, tooltip: 'Download QRcode.png' },
    { id: 'downloadSVGBtn', active: false, type: 'svg', class: ``, html: `QRcode.svg`, tooltip: 'Download QRcode.svg' }
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
            .then(dataUrl => {
                qrCodeDownload.value = dataUrl
                console.log('Data URL: ', dataUrl)
            })
            .catch(err => {
                console.error(err)
            })

        // canvas    
        // QRCode.toCanvas(
        //     document.getElementById('canvas'),
        //     qrCodeUrl.value, 
        //     { toSJISFunc: QRCode.toSJIS }, 
        //     function (error) {
        //         if (error) console.error(error)
        //         console.log('toCanvas success!', QRCode)
        //     }
        // )

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
        // qrCodeUrl.value = ''
        onBlur()
    }

}

const reset = () => {
    console.log('reset has been click')
    qrCodeUrl.value = ''
    isFocused.value = false
    qrCodeImage.value = ''
}

const download = (item) => {

    if( item.type === 'svg' ){
        // download SVG QRcode
        console.log('download', item.id)
        setTimeout( () => {
            const svg = document.getElementById("rhombus");
            const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
            const a = document.createElement('a');
            const e = new MouseEvent('click');
            a.download = 'QRcode.svg';
            a.href = 'data:image/svg+xml;base64,' + base64doc;
            a.dispatchEvent(e);
        }, 10)
    } else if ( item.type === 'png' ){
        setTimeout( () => {
            console.log('download', item.id)
            const canvas = document.getElementById("canvas");
            const dataURL = qrCodeDownload.value;
            // const dataURL = canvas.toDataURL('image/png');
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

<template src="./Home.html" />
<!-- <style src="./Home.scss" /> -->

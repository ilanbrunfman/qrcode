<script setup>
import { ref, computed, onMounted} from 'vue'
// components
import Wrapper from '@/components/wrapper/Wrapper.vue'

import './_home.scss'

const url = ref('')
const isFocused = ref(false)
const URL_Validation = ref(false)

const onFocus = () => {
    isFocused.value = true;

    if(url.value.length < 2) {
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
    if(url.value.length > 0) {
        isFocused.value = true;
    } else {
        isFocused.value = false;
    }
    console.log('onBlur')
};

const createQRCode = () => {
    console.log('createQRCode', url.value)

    url.value = ''
    onBlur()
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
                                <div class="col-12">
                                    <form class="form" @submit.prevent>
                                        <div class="form-field mb-1">
                                            <input 
                                                type="text" 
                                                id="url"
                                                placeholder=""
                                                autocomplete="url" 
                                                v-model="url"
                                                @focus="onFocus" @blur="onBlur"
                                                :class="['', isFocused ? 'focused' : '', URL_Validation ? '' : '']"
                                            />
                                            <label :class="['', isFocused ? 'focused' : '', URL_Validation ? '' : '']">Enter your website link</label>
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
                        <!-- <div class="col">
                            <div class="row">
                                <div class="col-12">
                                    <h3>World</h3>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </template>
    </Wrapper>
</template>
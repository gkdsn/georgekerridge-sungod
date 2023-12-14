<script setup>
const props = defineProps({
    modelValue: Object,
    scenes: Array
});

// Update the model using emit when changing the scene input using @change
const emit = defineEmits(['update:modelValue']);
const changeInput = (newValue) => {
    emit('update:modelValue', newValue);
};

</script>

<template>
    <div class="LensGuideScene absolute bottom-0 inset-x-0 z-20 h-24 flex flex-column justify-center items-start">
        <div class="LensGuideScene__container flex flex-row gap-x-1 p-1 bg-white rounded-lg">
            <!-- Use hidden radio inputs for toggling scene -->
            <label class="relative cursor-pointer rounded overflow-hidden" v-if="scenes" v-for="(scene, index) in scenes"
                :key="scene.sceneName" :for="scene.sceneName">
                <input class="LensGuideScene__input" type="radio" name="scene" :value="scene.sceneName"
                    :id="scene.sceneName" @change="() => changeInput(scene.sceneName)" :checked="index === 0"
                    :aria-label="scene.sceneName" />
                <div class="LensGuideScene__input-image-container w-11 h-11 flex justify-center items-center">
                    <img class="LensGuideScene__input-image-item pointer-events-none" loading="lazy" width="100%"
                        height="100%" :srcset="scene.nakedEyeImage.responsiveImage.srcSet" aria-label="scene image" />
                    <div
                        class="LensGuideScene__input-active absolute inset-0 z-20 flex justify-center items-center opacity-0">
                        <IconsLandscape />
                    </div>
                </div>
            </label>
            <button aria-label="close scene selector"
                class="LensGuideScene__close w-11 h-11 rounded bg-white flex justify-center items-center">
                <IconsClose />
            </button>
        </div>
    </div>
</template>

<style>
.LensGuideScene {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 66.92%);
}

.LensGuideScene__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

.LensGuideScene__input-active::after {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 0;
    opacity: 0.7;
    /* border-radius: 0.25rem; */
    background: linear-gradient(73deg, #5C0F99 -1.94%, #3449B8 58.96%, #1799E1 102.64%)
}


.LensGuideScene__input-active svg {
    z-index: 3;
}

.LensGuideScene__input:checked~.LensGuideScene__input-image-container .LensGuideScene__input-active {
    opacity: 1;
}
</style>
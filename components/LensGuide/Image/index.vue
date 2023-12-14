<script setup>
// Set rangeValue as 50% to start
// Could be debounced for performance in the DOM
const rangeValue = ref(50);

const props = defineProps({
    imageUrl: Object,
    sceneUrl: Object
});
</script>

<template>
    <div class="LensGuideImage relative w-full h-full overflow-hidden">
        <!-- Use range % with clip-path to clip the preview image -->
        <div class="LensGuideImage__preview absolute inset-0 bg-gray-200 z-10"
            :style="{ 'clip-path': 'inset(0 0 0 ' + rangeValue + '%)' }">
            <img class="LensGuideImage__preview-img object-cover object-center min-w-full min-h-full max-w-full max-h-full pointer-events-none"
                loading="lazy" width="100%" height="100%" :srcset="props.imageUrl.srcSet" :alt="props.imageUrl.alt" />
        </div>
        <div class="LensGuideImage__naked absolute inset-0 bg-gray-50 z-0">
            <img class="LensGuideImage__naked-img object-cover object-center min-w-full min-h-full max-w-full max-h-full pointer-events-none"
                loading="lazy" width="100%" height="100%" :srcset="props.sceneUrl.srcSet" :alt="props.sceneUrl.alt" />
        </div>

        <!-- Use range % to change left of indicator -->
        <div class="LensGuideImage__indicator absolute top-1/2 w-10 h-10 bg-white bg-opacity-50 rounded-full z-20  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
            :style="{ left: rangeValue + '%' }">
            <IconsHand />
        </div>

        <!-- Use a visually hidden range input to calculate slide % - ensuring it cannot extend to full
        width by offsetting by 8% -->
        <input class="LensGuideImage__range-input absolute inset-0 z-20 opacity-0 h-full" type="range" min="8" max="92"
            step="0.1" aria-label="Adjust slider to compare lens effect with the naked eye view" tabindex="-1"
            v-model="rangeValue">
    </div>
</template>


<style>
.LensGuideImage__range-input {
    left: 8%;
    right: 8%;
    width: 84%;
    cursor: grab;
}

.LensGuideImage__range-input:active {
    cursor: grabbing;
}
</style>
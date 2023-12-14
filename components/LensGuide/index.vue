<script setup>
// Get data from composables
const { products, loading, error } = productsData();
const { scenes } = scenesData();

// Filter product parts to just get the lenses
const lensesParts = computed(() => {
    return products.value?.renegades?.parts.find(part => part.name.toLowerCase() === 'lenses')?.options || [];
});

// Use reactives for selected lens and scene
const selectedLensType = ref(null);
const selectedScene = ref(null);

watchEffect(() => {
    // Auto select first lens on mount if no selected lens
    if (lensesParts.value?.length > 0 && !selectedLensType.value) {
        selectedLensType.value = lensesParts.value[0].sku;
    }

    // Auto select first scene image on mount if no selected scene
    if (scenes.value?.length > 0 && !selectedScene.value) {
        selectedScene.value = scenes.value[0];
    }
});

// Watch selectedScene for updates and convert string to scene data object
watch(selectedScene, (newSceneName) => {
    if (typeof newSceneName === 'string') {
        const matchingScene = scenes.value.find(scene => scene.sceneName === newSceneName);
        if (matchingScene) {
            selectedScene.value = matchingScene;
        }
    }
}, { immediate: true });

// Use computed to return the lens image object
const selectedLensImageURL = computed(() => {
    if (!selectedScene.value || !selectedLensType.value) return null;

    let scene = scenes.value.find(s => s.sceneName === selectedScene.value.sceneName);
    if (!scene) return null;

    let lensImage = scene.sceneImages[selectedLensType.value];
    return lensImage ? lensImage.image.responsiveImage : null;
});

// Use computed to return the scene image object
const selectedSceneImageURL = computed(() => {
    if (!selectedScene.value) return null;

    let scene = scenes.value.find(s => s.sceneName === selectedScene.value.sceneName);
    if (!scene) return null;

    let sceneImage = scene.nakedEyeImage;
    return sceneImage ? sceneImage.responsiveImage : null;
});
</script>

<template>
    <div v-if="loading" class="Loader h-full w-full flex items-center justify-center text-white">
        Loading...
    </div>
    <div v-else-if="products" class="LensGuide relative h-full mx-auto w-full">
        <div class="LensGuide__close-container absolute right-0 -top-9 text-white mb-3">
            <button
                class="LensGuide_close-button pb-0.25 border-white border-b-2 border-opacity-25 font-light text-sm hover:border-opacity-100">Close</button>
        </div>
        <div class="LensGuide__container flex flex-row h-full bg-white rounded-lg overflow-hidden">
            <div class="LensGuide__details-container flex items-start flex-shrink p-10">
                <select v-model="selectedLensType" class="LensGuide__details-select p-2 border-gray-500 border rounded-md">
                    <option v-for="(option, id) in lensesParts" :key="id" :value=option.sku>
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="LensGuide__image-container relative w-full h-full bg-grey-100">
                <LensGuideImage v-if="selectedLensImageURL && selectedSceneImageURL" :image-url="selectedLensImageURL"
                    :scene-url="selectedSceneImageURL" />
                <LensGuideScene v-if="scenes" v-model="selectedScene" :scenes="scenes" />
            </div>
        </div>
    </div>
</template>

<style>
.LensGuide {
    max-width: 1408px;
}

.LensGuide__details-container {
    min-width: 400px;
}
</style>
export const productsData = () => {
	// Use reactives to catch errors and loading
	const products = ref(null);
	const loading = ref(false);
	const error = ref(null);

	const fetchData = async () => {
		loading.value = true;
		try {
			const response = await fetch(
				'https://www.sungod.co/products/9150/renegades?pdp=1'
			);
			products.value = await response.json();
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	onMounted(fetchData);

	return { products, loading, error };
};

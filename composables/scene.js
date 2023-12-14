export const scenesData = () => {
	// Use reactives to catch errors and loading
	const scenes = ref(null);
	const loading = ref(false);
	const error = ref(null);

	const fetchData = async () => {
		loading.value = true;
		try {
			const response = await fetch(
				'https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json'
			);
			scenes.value = await response.json();
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	onMounted(fetchData);

	return { scenes, loading, error };
};

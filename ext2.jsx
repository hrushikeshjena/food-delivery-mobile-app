const submitProfile = async () => {
  if (!validateFields()) return;

  try {
    const formData = new FormData();
    formData.append('id', uid);
    formData.append('name', name);
    formData.append('phno', phno);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('dob', dob.toISOString().split('T')[0]);

    if (image) {
      formData.append('image', {
        uri: image,
        name: 'profile_image.jpg',
        type: 'image/jpeg',
      });
    }

    const response = await axios.post(
      'http://10.0.2.2:8083/user/create/registrations',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      const newProfileId = response.data;
      setProfileId(newProfileId); // Store the returned ID
      console.log('Profile updated successfully. ID:', newProfileId);
      Alert.alert('Success', `Profile updated successfully! ID: ${newProfileId}`);
    } else {
      Alert.alert('Error', 'Something went wrong!');
    }
  } catch (error) {
    Alert.alert('Error', error.response?.data?.message || 'Failed to update profile!');
    console.log('Error updating profile:', error);
  }
};

useEffect(() => {
  if (profileId) {
    const fetchProfileData = async () => {
      try {
        console.log('Fetching profile data for ID:', profileId);
        const response = await axios.get(`http://10.0.2.2:8083/user/get/user_id/${profileId}`);
        console.log('Fetched profile data:', response.data);
      } catch (error) {
        console.log('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }
}, [profileId]);


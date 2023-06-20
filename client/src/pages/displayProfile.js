import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROFILE, QUERY_INTEREST } from '../utils/queries';
import { UPDATE_PROFILE } from '../utils/mutations';
import Upload from '../components/Upload';
import Select from 'react-select';
import './Style/displayProfile.css'
import Auth from '../utils/auth';

const PersonalProfile = () => {
  const token = localStorage.getItem('id_token');
  const userData = Auth.getProfile(token);
  const { loading, error, data, refetch } = useQuery(QUERY_PROFILE, {
    variables: { profileUser: userData.data._id },
  });
  const { loading: interestLoading, data: interestData } = useQuery(QUERY_INTEREST);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [profileUser, setProfileUser] = useState({});
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]); // Initialize as an empty array
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setProfileUser(data.profile.profileUser);
      setAge(data.profile.age);
      setGender(data.profile.gender);
      setBio(data.profile.bio);

      // Filter out null values from the interests array
      const filteredInterests = data.profile.interests
        .filter((interest) => interest !== null)
        .map((interest) => ({
          value: interest._id,
          label: interest.label,
        }));
      setSelectedInterests(filteredInterests);
    }
  }, [data]);


  const handleUpdateProfile = async () => {
    try {
      // Extract the ID values from selectedInterests and convert them to strings
      const selectedInterestValues = selectedInterests
        .filter((interest) => interest !== null)
        .map((interest) => interest.value);

      await updateProfile({
        variables: {
          id: userData.data._id,
          age: age !== '' ? parseInt(age, 10) : null,
          gender,
          bio,
          interests: selectedInterestValues,
        },
      });
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };




  if (loading || interestLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { image, createdTrips } = data.profile;

  const interestOptions = interestData?.interests.map((interest) => ({
    value: interest._id,
    label: interest.label,
  }));

  const handleInterestsChange = (selectedOptions) => {
    setSelectedInterests(selectedOptions);
  };

  return (
    <section className="" style={{backgroundColor:'var(--beige)'}}>
  <div className="container-fluid" >
    <div className="row justify-content-center align-items-center h-100" >
      <div className="col-lg-10 mb-4 mb-lg-0">
        <div className="card mb-3" style={{ borderRadius: '.8rem' }}>
          <div className="row g-0">
            <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
              {image && <img src={image} alt="Avatar" className="my-5" style={{ width: '150px' }} />}
              <h5 className="card-title text-black">{profileUser.firstname}</h5>
              <h5 className="card-title text-black">{profileUser.lastname}</h5>
              <p className="card-text text-black">{profileUser.email}</p>
              
              <div className="form-control form-group mt-4" style={{border:'none'}}>
  <div className="custom-upload">
    <Upload className="profile-form" getUserDetails={refetch} />
  </div>
</div>
              
              {!isEditing && <i className="far fa-edit mb-5" onClick={() => setIsEditing(true)}></i>}
            </div>
            <div className="col-md-8">
              <div className="card-body p-4">
                <h6 className="card-title">Traveller Information</h6>
                <hr className="mt-0 mb-4" />
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6 className="card-title">Age</h6>
                    {isEditing ? (
                      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" />
                    ) : (
                      <p className="text-muted">{age}</p>
                    )}
                  </div>
                  <div className="col-6 mb-3">
                    <h6 className="card-title">Gender</h6>
                    {isEditing ? (
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-muted">{gender}</p>
                    )}
                  </div>
                </div>
                <div style={{ paddingBottom: '3rem' }}>
                  <h6 className="card-title">Bio</h6>
                  <hr className="mt-0 mb-4" />
                  {isEditing ? (
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control mb-3" rows={4} />
                  ) : (
                    <p className="card-text" style={{ color: 'var(--black)' }}>{bio}</p>
                  )}
                </div>
                <div style={{ paddingBottom: '3rem' }}>
                  <h6 className="card-title">Interests</h6>
                  <hr className="mt-0 mb-4" />
                  {isEditing ? (
                    <Select
                      className="custom-select"
                      placeholder="Interests"
                      name="interests"
                      value={selectedInterests}
                      onChange={handleInterestsChange}
                      options={interestOptions}
                      isMulti
                    />
                  ) : (
                    <p className="card-text" style={{ color: 'var(--black)' }}>{selectedInterests.map((interest) => interest.label).join(', ')}</p>
                  )}
                </div>
                <div>
                  <h6 className="card-title">Created Trips</h6>
                  <hr className="mt-0 mb-4" />
                  {createdTrips.map((trip) => (
                    <div key={trip.title}>
                      <h6 className="card-title">"{trip.title}"</h6>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-end">
                  {isEditing ? (
                    <>
                      <button className="btn btn-primary me-2" onClick={handleUpdateProfile}>
                        Save
                      </button>
                      <button className="btn btn-link" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default PersonalProfile;











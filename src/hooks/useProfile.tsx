import { useEffect, useState, useMemo } from "react";
import { ProfileType } from "../types/ProfileType";
import { onValue, ref } from "firebase/database";
import { dbRef } from "../config/firebaseConfig";

const useProfile = (uid: string) => {
	const [profile, setProfile] = useState<ProfileType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const profileRef = ref(dbRef, `profile/${uid}`);
		const unsubscribe = onValue(profileRef, (snapshot) => {
			setProfile(snapshot.val()); // make sure to use `.val()`
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, [uid]);

	const memoizedValue = useMemo(() => ({ profile, loading }), [profile, loading]);

	return memoizedValue;
};

export default useProfile;

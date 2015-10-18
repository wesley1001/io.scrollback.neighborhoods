import { AsyncStorage } from "react-native";
import PushNotification from "../modules/push-notification";
import core from "../store/core";
import userUtils from "../lib/user-utils";

const GCM_TIME_VALIDITY = 12 * 60 * 60 * 1000;
const KEY_REGISTER_TIME = "push_notification_gcm_register_time";

function initialize() {
	core.on("init-dn", init => {
		const userObj = init.user;

		if (!userUtils.isGuest(userObj.id)) {
			AsyncStorage.getItem(KEY_REGISTER_TIME)
				.catch(() => 0)
				.then(registerTime => {
					if (Date.now() - registerTime > GCM_TIME_VALIDITY) {
						PushNotification.registerGCM(result => {
							if (result.type !== "success") {
								return;
							}

							const user = Object.assign({}, userObj);

							const params = user.params ? Object.assign({}, user.params) : {};
							const pushNotifications = params.pushNotifications ? Object.assign({}, params.pushNotifications) : {};
							const devices = pushNotifications.devices ? Object.assign({}, pushNotifications.devices) : {};

							devices[result.uuid + "_" + result.pa] = {
								model: result.deviceModel,
								regId: result.registrationId,
								uuid: result.uuid,
								packageName: result.packageName,
								expiryTime: Date.now() + GCM_TIME_VALIDITY,
								platform: "android",
								enabled: true
							};

							core.emit("user-up", {
								to: user.id,
								user
							});
						});
					}
				});
		}
	});

	core.on("logout", () => {
		PushNotification.unRegisterGCM();
		AsyncStorage.removeItem(KEY_REGISTER_TIME).catch(() => {});
	});
}

export default { initialize };

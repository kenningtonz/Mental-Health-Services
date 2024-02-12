import { getDocs, collection } from "firebase/firestore";

class Service {
    constructor(serviceID, name, type, desc, cost, expect, imageName, oneline, conditions) {
        this.id = serviceID;
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.cost = cost;
        this.expect = expect;
        this.imageName = imageName;
        this.conditions = conditions;
        this.oneLine = oneline;
    }
}
const serviceConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Service(data.serviceID, data.name, data.type, data.desc, data.cost, data.expect, data.imageName, data.oneline, data.conditions);
    }
}

// const servicesSnapshot = await getDocs(collection(db, "services").withConverter(serviceConverter));
export const services = [];
export async function initServices(db) {
    let servicesSnapshot = await getDocs(collection(db, "services").withConverter(serviceConverter));
    servicesSnapshot.forEach((doc) => {
        services.push(doc.data());
    });
}

// servicesSnapshot.forEach((doc) => {
//     services.push(doc.data());
// });

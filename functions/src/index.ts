import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import * as sgMail from '@sendgrid/mail';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const sendItemByEmail = functions.firestore.document('items/{itemId}').onCreate(snapshot => {
    const item: any = snapshot.data();
    sgMail.setApiKey(functions.config().sendgrid.key);
    const template_id = functions.config().sendgrid.templateid;
    const msg = {
        to: 'gabriel.mello2016@gmail.com',
        from: 'gabrielo.mello2016@gmail.com',
        // subject: item.title,
        // text: item.description
        subject: "New Post",
        dynamic_template_data: {
            title: item.title,
            description: item.description,
            tags: [item.tags],
            createdAt: item.createdAt,
        },
        templateId: template_id,
    };

    return sgMail.send(msg)
    .then( data => console.log("Enviado com sucesso:"+ data))
    .catch( erro => console.log(erro))
});

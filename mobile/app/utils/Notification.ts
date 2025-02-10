export const sendPushNotification = async (expoPushToken: string, message: { title: string; body: string; data?: any }): Promise<void> => {
    if (!expoPushToken) {
      alert('Veuillez entrer un token valide.');
      return;
    }
  
    const payload = {
      to: expoPushToken,
      sound: 'default',
      title: message.title,
      body: message.body,
      data: message.data || { timestamp: new Date().getTime() },
    };
    console.log(payload);
    
    try {
        console.log(expoPushToken+"  pushee");
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    //   console.log(pa:ylod);

  
      const responseData = await response.json();
      console.log("Réponse de l'envoi de notification :", responseData);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification :", error);
    }
  };
  
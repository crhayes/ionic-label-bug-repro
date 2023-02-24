import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

const INITIAL_ITEMS = [10, 20, 30];

/**
 * Bug Reproduction
 *
 * Several value items are displayed with a sum below.
 * Clicking a value item will remove it from the list and update the sum.
 * The sum does not re-render appropriately when it's rendered at the bottom of the list inside a label.
 * Note that in the default setup, as you remove items the sum will remain `60`.
 *
 * This issue appears to occur only on native iOS (i.e. simulator and physical device).
 */
const Home: React.FC = () => {
  const [renderLabel, setRenderLabel] = useState(true);
  const [renderBottom, setRenderBottom] = useState(true);
  const [items, setItems] = useState<number[]>([...INITIAL_ITEMS]);
  const sum = [...items].reduce((total, item) => total + item, 0);

  function removeItem(atIndex: number) {
    const newItems = [...items];
    newItems.splice(atIndex, 1);
    setItems(newItems);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bug Repro</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setItems([...INITIAL_ITEMS])}>
              Reset Items
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonCheckbox
              checked={renderLabel}
              onIonChange={(e) => setRenderLabel(e.detail.checked)}
            />
            <IonLabel>Render sum inside label?</IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              checked={renderBottom}
              onIonChange={(e) => setRenderBottom(e.detail.checked)}
            />
            <IonLabel>Render at the bottom of the list?</IonLabel>
          </IonItem>

          {!renderBottom && (
            <IonItem>
              {renderLabel ? <IonLabel>Sum: {sum}</IonLabel> : <>Sum: {sum}</>}
            </IonItem>
          )}

          {items.map((value, index) => (
            <IonItem key={value} button onClick={() => removeItem(index)}>
              <IonLabel>{value}</IonLabel>
            </IonItem>
          ))}

          {renderBottom && (
            <IonItem>
              {renderLabel ? <IonLabel>Sum: {sum}</IonLabel> : <>Sum: {sum}</>}
            </IonItem>
          )}
        </IonList>
        <IonGrid className="ion-padding">
          <h1>Cases</h1>
          <IonRow>
            <IonCol>
              <strong>Inside Label?</strong>
            </IonCol>
            <IonCol>
              <strong>Bottom?</strong>
            </IonCol>
            <IonCol>
              <strong>Bug?</strong>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Y</IonCol>
            <IonCol>Y</IonCol>
            <IonCol>Y</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Y</IonCol>
            <IonCol>N</IonCol>
            <IonCol>N</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>N</IonCol>
            <IonCol>Y</IonCol>
            <IonCol>N</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>N</IonCol>
            <IonCol>N</IonCol>
            <IonCol>N</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

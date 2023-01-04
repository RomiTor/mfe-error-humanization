import { useEffect, useState } from "react";
import ModalDialogue from "canvas-core-react/lib/ModalDialogue";
import ModalAlert from "canvas-core-react/lib/ModalAlert";
import getHumanizedError from "lib-error-humanization";


interface ErrorHumanizationParams {
    errorCode: string;
    onPrimaryAction?: () => any;
    onSecondaryAction?: () => any;
}

export const ErrorHumanization = ({
    errorCode,
    onPrimaryAction = () => {},
    onSecondaryAction,
}: ErrorHumanizationParams) => {
    const [errorData, setErrorData] = useState({
        title: "",
        description: "",
    });

    const [showModal, setShowModal] = useState(true);

    const callOnPrimaryAction = () => {
        setShowModal(false);
        onPrimaryAction();
    };

    const callOnSecondaryAction = () => {
        setShowModal(false);
        onSecondaryAction && onSecondaryAction();
    };

    useEffect(() => {
        // TODO call api service to fetch error data, add token too
        getHumanizedError(errorCode).then(result => {
            setErrorData({
                title: result.error_title,
                description: result.error_msg,
            });
          })
        
    }, [errorCode]);

    return onSecondaryAction ? (
        <ModalDialogue
            headline={errorData.title}
            isModalVisible={showModal}
            primaryButtonLabel={"Primary Button"}
            primaryAction={callOnPrimaryAction}
            secondaryButtonLabel={"Secondary Button"}
            secondaryAction={callOnSecondaryAction}
            setModalVisible={() => {}}
        >
            {errorData.description}
        </ModalDialogue>
    ) : (
        <ModalAlert
            headline={errorData.title}
            isModalVisible={showModal}
            primaryButtonLabel={"Primary Button"}
            primaryAction={callOnPrimaryAction}
            setModalVisible={() => {}}
        >
            {errorData.description}
        </ModalAlert>
    );
};

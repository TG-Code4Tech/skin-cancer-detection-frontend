import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import Heading from "../Heading/Heading";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

interface ModalProps {
    variant: "default" | "danger" | "warning" | "popup";
    buttonText: string;
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    onAbort?: () => void;
}

const Modal: React.FC<ModalProps> = ({ variant, buttonText, isOpen, title, children, onClose, onConfirm, onAbort }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const firstFocusableElementRef = useRef<HTMLElement | null>(null);
    const lastFocusableElementRef = useRef<HTMLElement | null>(null);

    // Focus Trap
    useEffect(() => {
        if (isOpen) {
            // Initially focus closeButton
            closeButtonRef.current?.focus();

            // Focus Trap: keeps focus inside modal
            const focusableElements = modalRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement> | null;

            if (focusableElements && focusableElements.length > 0) {
                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement = focusableElements[focusableElements.length - 1];

                firstFocusableElementRef.current = firstFocusableElement;
                lastFocusableElementRef.current = lastFocusableElement;

                const trapTabKey = (e: KeyboardEvent) => {
                    if (e.key === "Tab") {
                        if (e.shiftKey) {
                            // Focus last focusable element when shift-key is pressed
                            if (document.activeElement === firstFocusableElementRef.current) {
                                e.preventDefault();
                                lastFocusableElementRef.current?.focus();
                            }
                        } else {
                            // Focus next focusable element
                            if (document.activeElement === lastFocusableElementRef.current) {
                                e.preventDefault();
                                firstFocusableElementRef.current?.focus();
                            }
                        }
                    }
                };

                document.addEventListener("keydown", trapTabKey);
                return () => {
                    document.removeEventListener("keydown", trapTabKey);
                };
            }
        }
    }, [isOpen]);

    // Close overlay when ESC is pressed
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.modalOverlay}
            role="dialog"
            aria-labelledby="modal-title"
            aria-hidden={!isOpen}
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className={styles.modalContent}
                role="document"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()} // Don't close on click on modal content
            >
                <header className={styles.modalHeader}>
                    {(variant === "danger" || variant === "warning") && (
                        <Icon name={variant} size={28} color={variant} classname={styles.headingIcon} />
                    )}
                    <Heading id="modal-title" as="h2" variant="md" headingText={title} className={styles.title} />
                    <IconButton
                        iconName="close"
                        iconSize={28}
                        iconColor="default"
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Modal schließen"
                    />
                </header>
                <div className={styles.modalBody}>{children}</div>
                {variant !== "popup" && (
                    <footer className={styles.modalFooter}>
                        <Button
                            variant="secondary"
                            buttonText="Abbrechen"
                            aria-label="Modal Schließen"
                            onClick={onAbort ? onAbort : onClose}
                        />
                        <Button variant={variant} buttonText={buttonText} onClick={onConfirm} />
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Modal;

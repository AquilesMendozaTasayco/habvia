"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Upload,
  X,
  Save,
  MonitorPlay
} from "lucide-react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    lema: "",
    subtitulo: "",
    boton: "",
    href: "",
    active: true,
    order: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // 🏛️ Identidad Habvia
  const colorAzul = "#2C3E73";
  const colorOro = "#D4A017";

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "banners"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const bannersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBanners(bannersData);
    } catch (error) {
      console.error("Error fetching banners:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los banners",
        confirmButtonColor: colorAzul,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({ icon: "error", title: "Imagen no válida", confirmButtonColor: colorAzul });
      return;
    }

    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const fileName = `banners/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
      setImagePreview(downloadURL);

      Swal.fire({ icon: "success", title: "Imagen cargada", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error al subir", confirmButtonColor: colorAzul });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = () => {
    setEditingBanner(null);
    setFormData({ imageUrl: "", lema: "", subtitulo: "", boton: "", href: "", active: true, order: banners.length });
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      imageUrl: banner.imageUrl,
      lema: banner.lema || "",
      subtitulo: banner.subtitulo || "",
      boton: banner.boton || "",
      href: banner.href || "",
      active: banner.active,
      order: banner.order
    });
    setImagePreview(banner.imageUrl);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.imageUrl) {
      Swal.fire({ icon: "warning", title: "Sube una imagen", confirmButtonColor: colorAzul });
      return;
    }

    try {
      if (editingBanner) {
        await updateDoc(doc(db, "banners", editingBanner.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "banners"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      setShowModal(false);
      fetchBanners();
      Swal.fire({ icon: "success", title: "¡Listo!", timer: 1500, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error al guardar", confirmButtonColor: colorAzul });
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      await updateDoc(doc(db, "banners", banner.id), {
        active: !banner.active,
        updatedAt: serverTimestamp()
      });
      fetchBanners();
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (banner) => {
    const result = await Swal.fire({
      title: "¿Eliminar recurso?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: colorAzul,
      confirmButtonText: "Eliminar permanentemente",
    });

    if (result.isConfirmed) {
      try {
        if (banner.imageUrl) {
          try { await deleteObject(ref(storage, banner.imageUrl)); } catch (e) {}
        }
        await deleteDoc(doc(db, "banners", banner.id));
        fetchBanners();
      } catch (error) { console.error(error); }
    }
  };

  // Campo de texto reutilizable
  const Field = ({ label, value, onChange, placeholder = "" }) => (
    <div className="space-y-3">
      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-gray-100 py-3 text-sm font-light text-[#2C3E73] focus:border-[#D4A017] outline-none transition-colors placeholder:text-gray-200"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER TÉCNICO */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 w-[2px]" style={{ backgroundColor: colorOro }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
                Visual Assets Management
              </p>
            </div>
            <h1 className="text-4xl font-light uppercase tracking-[0.1em] text-[#2C3E73]">
              Banners <span className="font-bold">Principales</span>
            </h1>
          </div>
          
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            className="flex items-center justify-center gap-4 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all shadow-xl"
            style={{ backgroundColor: colorAzul }}
          >
            <Plus size={16} style={{ color: colorOro }} />
            Añadir Nueva Pieza
          </motion.button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: `${colorOro} transparent ${colorOro} ${colorOro}` }}></div>
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-white border border-gray-100 p-32 text-center shadow-sm">
            <MonitorPlay size={40} className="mx-auto mb-6 text-gray-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Galería sin contenido</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner) => (
              <motion.div
                key={banner.id}
                layout
                className="group relative bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <img src={banner.imageUrl} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Habvia Banner" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#2C3E73] shadow-sm">
                    ORDEN / {banner.order}
                  </div>
                  {/* Lema preview sobre la imagen */}
                  {banner.lema && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white truncate">{banner.lema}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-1.5 w-1.5 rounded-full ${banner.active ? 'bg-[#D4A017]' : 'bg-gray-200'}`} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      {banner.active ? "En Exhibición" : "Oculto"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(banner)} className="p-2.5 text-gray-400 hover:text-[#2C3E73] hover:bg-gray-50 transition-all"><Pencil size={14} /></button>
                    <button onClick={() => handleToggleActive(banner)} className="p-2.5 text-gray-400 hover:text-[#D4A017] hover:bg-gray-50 transition-all"><Eye size={14} /></button>
                    <button onClick={() => handleDelete(banner)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* MODAL HABVIA EXPERIENCE */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !uploadingImage && setShowModal(false)}
                className="absolute inset-0 bg-[#2C3E73]/40 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="relative w-full max-w-2xl bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-10 py-8 border-b border-gray-50 sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#2C3E73]">
                      Configuración de <span className="text-[#D4A017]">Recurso</span>
                    </h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-gray-300 hover:text-[#2C3E73] transition-colors">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-10 space-y-10">

                  {/* ORDEN + ESTADO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Prioridad de Visualización</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        className="w-full border-b border-gray-100 py-3 text-lg font-light text-[#2C3E73] focus:border-[#D4A017] outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6">
                      <div 
                        onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${formData.active ? 'bg-[#2C3E73]' : 'bg-gray-100'}`}
                      >
                        <motion.div 
                          animate={{ x: formData.active ? 20 : 0 }}
                          className="w-3 h-3 bg-white rounded-full shadow-sm"
                        />
                      </div>
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Estado de visibilidad</label>
                    </div>
                  </div>

                  {/* TEXTOS DEL SLIDE */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Contenido del Slide</p>
                    </div>

                    <Field
                      label="Lema Principal"
                      value={formData.lema}
                      onChange={v => setFormData(prev => ({ ...prev, lema: v }))}
                      placeholder="EXCLUSIVIDAD EN CADA DETALLE"
                    />
                    <Field
                      label="Subtítulo"
                      value={formData.subtitulo}
                      onChange={v => setFormData(prev => ({ ...prev, subtitulo: v }))}
                      placeholder="Proyectos diseñados para una nueva forma de vivir."
                    />
                    <Field
                      label="Texto del Botón"
                      value={formData.boton}
                      onChange={v => setFormData(prev => ({ ...prev, boton: v }))}
                      placeholder="DESCUBRIR PROYECTO"
                    />
                    <Field
                      label="Enlace (href)"
                      value={formData.href}
                      onChange={v => setFormData(prev => ({ ...prev, href: v }))}
                      placeholder="/proyectos/nombre-proyecto"
                    />
                  </div>

                  {/* IMAGEN */}
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 block">Archivo Maestro (21:9)</label>
                    
                    {imagePreview ? (
                      <div className="relative aspect-[21/9] border border-gray-100 overflow-hidden group">
                        <img src={imagePreview} className="h-full w-full object-cover" alt="Habvia Preview" />
                        <div className="absolute inset-0 bg-[#2C3E73]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => { setImagePreview(""); setFormData(prev => ({ ...prev, imageUrl: "" })); }}
                            className="bg-white p-4 text-[#2C3E73] hover:text-red-600 transition-colors shadow-xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex aspect-[21/9] cursor-pointer flex-col items-center justify-center border border-dashed border-gray-200 bg-gray-50 hover:bg-white transition-all group">
                        {uploadingImage ? (
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: `${colorOro} transparent ${colorOro} ${colorOro}` }}></div>
                        ) : (
                          <>
                            <Upload size={30} className="mb-4 text-gray-200 group-hover:text-[#D4A017] transition-colors" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#2C3E73]">Cargar Imagen de Alta Gama</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex sticky bottom-0">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-[#2C3E73] hover:bg-gray-50 transition-all border-t border-gray-50"
                  >
                    Descartar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={uploadingImage}
                    className="flex-[1.5] py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-all disabled:opacity-50 relative overflow-hidden group"
                    style={{ backgroundColor: colorAzul }}
                  >
                    <div className="absolute inset-0 bg-[#D4A017] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
                    <div className="relative flex items-center justify-center gap-3">
                      <Save size={14} style={{ color: colorOro }} />
                      {editingBanner ? "Confirmar Cambios" : "Publicar Banner"}
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save,
  Building2, MapPin, Image as ImageIcon, List, FolderOpen,
  HardHat, Link as LinkIcon, ToggleLeft, ToggleRight,
  Tag, FileText, Play, ChevronRight,
  Home, Star, Shield, Zap, Heart, Award, Check, Sun,
  Droplets, Wind, Leaf, Car, Wifi, Lock, Key, Trees,
  Waves, Mountain, Coffee, Dumbbell, Book, Music,
  Camera, Globe, Compass, Flame, Clock, Users, Layers,
  Grid, Package, Truck, Phone, Mail, Map, Building,
  ParkingCircle, Utensils, ShoppingBag, Baby, Dog
} from "lucide-react";

// ─── Paleta Habvia / Nuevo Pacífico ───────────────────────────────────────────
const colorAzul = "#2C3E73";
const colorOro  = "#D4A017";

// ─── Ícono map Lucide disponibles para características ────────────────────────
const ICON_OPTIONS = [
  { key: "Home",          label: "Casa",           Icon: Home          },
  { key: "Building",      label: "Edificio",        Icon: Building      },
  { key: "Building2",     label: "Edificio 2",      Icon: Building2     },
  { key: "Layers",        label: "Pisos",           Icon: Layers        },
  { key: "Grid",          label: "Planta",          Icon: Grid          },
  { key: "Star",          label: "Estrella",        Icon: Star          },
  { key: "Award",         label: "Premio",          Icon: Award         },
  { key: "Shield",        label: "Seguridad",       Icon: Shield        },
  { key: "Lock",          label: "Cerradura",       Icon: Lock          },
  { key: "Key",           label: "Llave",           Icon: Key           },
  { key: "Zap",           label: "Eléctrico",       Icon: Zap           },
  { key: "Sun",           label: "Iluminación",     Icon: Sun           },
  { key: "Wifi",          label: "Internet",        Icon: Wifi          },
  { key: "Droplets",      label: "Agua",            Icon: Droplets      },
  { key: "Wind",          label: "Ventilación",     Icon: Wind          },
  { key: "Flame",         label: "Gas",             Icon: Flame         },
  { key: "Leaf",          label: "Verde/Eco",       Icon: Leaf          },
  { key: "Trees",         label: "Áreas verdes",    Icon: Trees         },
  { key: "Waves",         label: "Piscina",         Icon: Waves         },
  { key: "Mountain",      label: "Vista",           Icon: Mountain      },
  { key: "Car",           label: "Estacionamiento", Icon: Car           },
  { key: "ParkingCircle", label: "Parking",         Icon: ParkingCircle },
  { key: "Truck",         label: "Mudanza",         Icon: Truck         },
  { key: "Dumbbell",      label: "Gimnasio",        Icon: Dumbbell      },
  { key: "Coffee",        label: "Sala común",      Icon: Coffee        },
  { key: "Utensils",      label: "Cocina",          Icon: Utensils      },
  { key: "ShoppingBag",   label: "Comercio",        Icon: ShoppingBag   },
  { key: "Baby",          label: "Niños",           Icon: Baby          },
  { key: "Dog",           label: "Mascotas",        Icon: Dog           },
  { key: "Users",         label: "Comunidad",       Icon: Users         },
  { key: "Heart",         label: "Bienestar",       Icon: Heart         },
  { key: "Book",          label: "Biblioteca",      Icon: Book          },
  { key: "Music",         label: "Entretenimiento", Icon: Music         },
  { key: "Camera",        label: "CCTV",            Icon: Camera        },
  { key: "Globe",         label: "Ubicación",       Icon: Globe         },
  { key: "Map",           label: "Mapa",            Icon: Map           },
  { key: "Compass",       label: "Orientación",     Icon: Compass       },
  { key: "Clock",         label: "Horario",         Icon: Clock         },
  { key: "Phone",         label: "Teléfono",        Icon: Phone         },
  { key: "Mail",          label: "Correo",          Icon: Mail          },
  { key: "Package",       label: "Entrega",         Icon: Package       },
  { key: "Check",         label: "Incluido",        Icon: Check         },
];

const getIconComponent = (key) => {
  const found = ICON_OPTIONS.find(o => o.key === key);
  return found ? found.Icon : Home;
};

// ─── Constantes ───────────────────────────────────────────────────────────────
const ESTADO_OPTIONS = [
  { value: "en-venta",  label: "En Venta",  color: "bg-green-100 text-green-700" },
  { value: "realizado", label: "Realizado", color: "bg-slate-100 text-slate-600" },
];

const EMPTY_FORM = {
  slug: "", titulo: "", ciudad: "", estado: "en-venta",
  descripcion: { titulo: "", subtitulo: "", texto: "" },
  imagenPrincipal: "", banner: "",
  caracteristicas: [{ icono: "Home", titulo: "", desc: "" }],
  categoriasGaleria: [
    { key: "todos",                label: "TODOS"                 },
    { key: "sala-comedor",         label: "SALA COMEDOR"          },
    { key: "planos",               label: "PLANOS"                },
    { key: "flyers",               label: "FLYERS"                },
    { key: "habitacion-principal", label: "HABITACIÓN PRINCIPAL"  },
  ],
  galeria: [],
  active: true,
  avanceObra:  { activo: false, descripcion: "", enlace: "" },
  recorridos3d: [{ titulo: "", url: "" }],
};

const TABS = [
  { key: "info",            label: "Información",     icon: Building2 },
  { key: "descripcion",     label: "Descripción",     icon: FileText  },
  { key: "imagenes",        label: "Imágenes",        icon: ImageIcon },
  { key: "caracteristicas", label: "Características", icon: List      },
  { key: "galeria",         label: "Galería",         icon: FolderOpen},
  { key: "categorias",      label: "Categorías",      icon: Tag       },
  { key: "recorridos",      label: "Recorridos 3D",   icon: Play      },
  { key: "avance",          label: "Avance de Obra",  icon: HardHat   },
];

// ─── Componente campo de texto reutilizable (estilo banners) ──────────────────
const Field = ({ label, value, onChange, placeholder = "", type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-b border-gray-100 py-3 text-sm font-light focus:border-[#D4A017] outline-none transition-colors placeholder:text-gray-200"
      style={{ color: colorAzul }}
    />
  </div>
);

// ─── Selector de ícono Lucide ─────────────────────────────────────────────────
function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const CurrentIcon = getIconComponent(value);

  return (
    <div className="relative">
      <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Ícono</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-2 bg-white hover:border-[#D4A017] transition-colors w-full"
      >
        <CurrentIcon size={16} style={{ color: colorAzul }} />
        <span className="text-[10px] font-bold text-gray-500 truncate flex-1 text-left">
          {ICON_OPTIONS.find(o => o.key === value)?.label || "Elegir"}
        </span>
        <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-50 top-full left-0 mt-1 w-64 bg-white border border-gray-100 shadow-xl rounded-sm max-h-60 overflow-y-auto"
          >
            <div className="grid grid-cols-4 gap-1 p-2">
              {ICON_OPTIONS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => { onChange(key); setOpen(false); }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-gray-50 transition-colors ${value === key ? "bg-blue-50 ring-1 ring-[#2C3E73]/20" : ""}`}
                >
                  <Icon size={16} style={{ color: value === key ? colorAzul : "#94a3b8" }} />
                  <span className="text-[7px] text-gray-400 leading-tight text-center truncate w-full">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function AdminProyectosPage() {
  const [proyectos,       setProyectos]       = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [showModal,       setShowModal]       = useState(false);
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [formData,        setFormData]        = useState(EMPTY_FORM);
  const [uploading,       setUploading]       = useState({ principal: false, banner: false, galeria: false });
  const [activeTab,       setActiveTab]       = useState("info");

  /* ── Firebase helpers ── */
  const fetchProyectos = async () => {
    try {
      setLoading(true);
      const q    = query(collection(db, "proyectos"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setProyectos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      Swal.fire({ icon: "error", title: "Error al cargar", confirmButtonColor: colorAzul });
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProyectos(); }, []);

  const toSlug = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const uploadImg = async (file, folder) => {
    const r = ref(storage, `proyectos/${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(r, file);
    return getDownloadURL(r);
  };

  /* ── Upload handlers ── */
  const mkUploadHandler = (field, folder) => async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(p => ({ ...p, [field]: true }));
    try {
      const url = await uploadImg(file, folder);
      setFormData(p => ({ ...p, [field === "principal" ? "imagenPrincipal" : "banner"]: url }));
      Swal.fire({ icon: "success", title: "Imagen cargada", timer: 1200, showConfirmButton: false });
    } catch { Swal.fire({ icon: "error", title: "Error al subir", confirmButtonColor: colorAzul }); }
    finally { setUploading(p => ({ ...p, [field]: false })); }
  };
  const handleUploadPrincipal = mkUploadHandler("principal", "principal");
  const handleUploadBanner    = mkUploadHandler("banner",    "banners");

  const handleUploadGaleria = async (e) => {
    const files = Array.from(e.target.files); if (!files.length) return;
    setUploading(p => ({ ...p, galeria: true }));
    try {
      const nuevas = await Promise.all(files.map(async (f) => ({
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        src: await uploadImg(f, "galeria"), alt: f.name,
        categoria: formData.categoriasGaleria[1]?.key || "sala-comedor",
      })));
      setFormData(p => ({ ...p, galeria: [...p.galeria, ...nuevas] }));
      Swal.fire({ icon: "success", title: `${nuevas.length} imagen(es) añadida(s)`, timer: 1400, showConfirmButton: false });
    } catch { Swal.fire({ icon: "error", title: "Error al subir", confirmButtonColor: colorAzul }); }
    finally { setUploading(p => ({ ...p, galeria: false })); }
  };

  /* ── Field helpers ── */
  const setDesc   = (k, v) => setFormData(p => ({ ...p, descripcion: { ...p.descripcion, [k]: v } }));
  const setAvance = (k, v) => setFormData(p => ({ ...p, avanceObra:  { ...p.avanceObra,  [k]: v } }));

  const handleCaract  = (i, k, v) => { const a = [...formData.caracteristicas]; a[i] = { ...a[i], [k]: v }; setFormData(p => ({ ...p, caracteristicas: a })); };
  const addCaract     = ()        => setFormData(p => ({ ...p, caracteristicas: [...p.caracteristicas, { icono: "Home", titulo: "", desc: "" }] }));
  const removeCaract  = (i)       => setFormData(p => ({ ...p, caracteristicas: p.caracteristicas.filter((_, j) => j !== i) }));

  const handleCatG  = (i, k, v) => { const a = [...formData.categoriasGaleria]; a[i] = { ...a[i], [k]: v }; if (k === "label") a[i].key = toSlug(v); setFormData(p => ({ ...p, categoriasGaleria: a })); };
  const addCatG     = ()        => setFormData(p => ({ ...p, categoriasGaleria: [...p.categoriasGaleria, { key: "", label: "" }] }));
  const removeCatG  = (i)       => setFormData(p => ({ ...p, categoriasGaleria: p.categoriasGaleria.filter((_, j) => j !== i) }));

  const handleRec   = (i, k, v) => { const a = [...(formData.recorridos3d || [])]; a[i] = { ...a[i], [k]: v }; setFormData(p => ({ ...p, recorridos3d: a })); };
  const addRec      = ()        => setFormData(p => ({ ...p, recorridos3d: [...(p.recorridos3d || []), { titulo: "", url: "" }] }));
  const removeRec   = (i)       => setFormData(p => ({ ...p, recorridos3d: (p.recorridos3d || []).filter((_, j) => j !== i) }));

  const handleGalCat = (id, cat) => setFormData(p => ({ ...p, galeria: p.galeria.map(img => img.id === id ? { ...img, categoria: cat } : img) }));
  const removeGalImg = (id)      => setFormData(p => ({ ...p, galeria: p.galeria.filter(img => img.id !== id) }));

  /* ── Modal open ── */
  const handleCreate = () => { setEditingProyecto(null); setFormData(EMPTY_FORM); setActiveTab("info"); setShowModal(true); };
  const handleEdit   = (p) => {
    setEditingProyecto(p);
    setFormData({
      slug:            p.slug            || "",
      titulo:          p.titulo          || "",
      ciudad:          p.ciudad          || "",
      estado:          p.estado          || "en-venta",
      descripcion: {
        titulo:    p.descripcion?.titulo    ?? "",
        subtitulo: p.descripcion?.subtitulo ?? "",
        texto:     p.descripcion?.texto     ?? "",
      },
      imagenPrincipal: p.imagenPrincipal || "",
      banner:          p.banner          || "",
      caracteristicas: p.caracteristicas?.length
        ? p.caracteristicas.map(c => typeof c === "string" ? { icono: "Home", titulo: c, desc: "" } : { icono: c.icono || "Home", titulo: c.titulo || "", desc: c.desc || "" })
        : [{ icono: "Home", titulo: "", desc: "" }],
      categoriasGaleria: p.categoriasGaleria?.length ? p.categoriasGaleria : EMPTY_FORM.categoriasGaleria,
      galeria:  p.galeria  || [],
      active:   p.active !== false,
      avanceObra: {
        activo:      p.avanceObra?.activo      ?? false,
        descripcion: p.avanceObra?.descripcion  ?? "",
        // compatibilidad hacia atrás: enlace o enlaceFacebook
        enlace:      p.avanceObra?.enlace       ?? p.avanceObra?.enlaceFacebook ?? "",
      },
      recorridos3d: p.recorridos3d?.length ? p.recorridos3d : [{ titulo: "", url: "" }],
    });
    setActiveTab("info"); setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.titulo.trim())    return Swal.fire({ icon: "warning", title: "El título es obligatorio",  confirmButtonColor: colorAzul });
    if (!formData.imagenPrincipal)  return Swal.fire({ icon: "warning", title: "Sube la imagen principal", confirmButtonColor: colorAzul });
    const payload = {
      ...formData,
      slug:          formData.slug || toSlug(formData.titulo),
      caracteristicas: formData.caracteristicas.filter(c => c.titulo?.trim()),
      recorridos3d:    (formData.recorridos3d || []).filter(r => r.titulo?.trim() && r.url?.trim()),
      updatedAt: serverTimestamp(),
    };
    try {
      editingProyecto
        ? await updateDoc(doc(db, "proyectos", editingProyecto.id), payload)
        : await addDoc(collection(db, "proyectos"), { ...payload, createdAt: serverTimestamp() });
      setShowModal(false); fetchProyectos();
      Swal.fire({ icon: "success", title: "¡Proyecto guardado!", timer: 1500, showConfirmButton: false });
    } catch (e) {
      console.error(e);
      Swal.fire({ icon: "error", title: "Error al guardar", confirmButtonColor: colorAzul });
    }
  };

  const handleToggle = async (proyecto) => {
    try { await updateDoc(doc(db, "proyectos", proyecto.id), { active: !proyecto.active, updatedAt: serverTimestamp() }); fetchProyectos(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (proyecto) => {
    const r = await Swal.fire({ title: "¿Eliminar proyecto?", text: "Se borrará permanentemente", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#64748b", confirmButtonText: "Sí, eliminar" });
    if (r.isConfirmed) { try { await deleteDoc(doc(db, "proyectos", proyecto.id)); fetchProyectos(); } catch (e) { console.error(e); } }
  };

  /* ────────────────── UI ────────────────── */
  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12">
      <div className="mx-auto max-w-7xl">

        {/* HEADER — estilo banners */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 w-[2px]" style={{ backgroundColor: colorOro }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
                Project Management
              </p>
            </div>
            <h1 className="text-4xl font-light uppercase tracking-[0.1em]" style={{ color: colorAzul }}>
              Gestión de <span className="font-bold">Proyectos</span>
            </h1>
          </div>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={handleCreate}
            className="flex items-center justify-center gap-4 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all shadow-xl"
            style={{ backgroundColor: colorAzul }}>
            <Plus size={16} style={{ color: colorOro }} />
            Añadir Proyecto
          </motion.button>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: `${colorOro} transparent ${colorOro} ${colorOro}` }} />
          </div>
        ) : proyectos.length === 0 ? (
          <div className="bg-white border border-gray-100 p-32 text-center shadow-sm">
            <Building2 size={40} className="mx-auto mb-6 text-gray-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Sin proyectos registrados</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto) => {
              const estadoOpt      = ESTADO_OPTIONS.find(e => e.value === proyecto.estado);
              const tieneAvance    = proyecto.avanceObra?.activo && (proyecto.avanceObra?.enlace || proyecto.avanceObra?.enlaceFacebook);
              const tieneRecorrido = proyecto.recorridos3d?.some(r => r.url);
              return (
                <motion.div key={proyecto.id} layout
                  className="group relative bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    {proyecto.imagenPrincipal
                      ? <img src={proyecto.imagenPrincipal} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={proyecto.titulo} />
                      : <div className="flex h-full items-center justify-center"><ImageIcon size={40} className="text-gray-200" /></div>
                    }
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest shadow-sm"
                      style={{ color: colorAzul }}>
                      {estadoOpt?.label || proyecto.estado}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 text-[9px] font-bold">
                      {proyecto.galeria?.length || 0} fotos
                    </div>
                    {proyecto.titulo && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white truncate">{proyecto.titulo}</p>
                        {proyecto.ciudad && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin size={9} className="text-white/60" />
                            <span className="text-[9px] text-white/60">{proyecto.ciudad}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 flex gap-1">
                      {tieneAvance    && <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 text-[8px] font-bold"><HardHat size={9} /> Avance</div>}
                      {tieneRecorrido && <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-1 text-[8px] font-bold"><Play size={9} /> 3D</div>}
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full ${proyecto.active ? "animate-pulse" : "bg-gray-200"}`}
                        style={{ backgroundColor: proyecto.active ? colorOro : undefined }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        {proyecto.active ? "Visible" : "Oculto"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(proyecto)}   className="p-2.5 text-gray-400 hover:text-[#2C3E73] hover:bg-gray-50 transition-all"><Pencil size={14} /></button>
                      <button onClick={() => handleToggle(proyecto)} className="p-2.5 text-gray-400 hover:bg-gray-50 transition-all" style={{ color: proyecto.active ? "#94a3b8" : colorOro }}>
                        {proyecto.active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => handleDelete(proyecto)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── MODAL ── */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 backdrop-blur-md"
                style={{ backgroundColor: `${colorAzul}66` }} />

              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.3)]"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-gray-50 flex-shrink-0 sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: colorAzul }}>
                      {editingProyecto ? "Editar" : "Nuevo"} <span style={{ color: colorOro }}>Proyecto</span>
                    </h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-gray-300 hover:text-gray-700 transition-colors"><X size={20} strokeWidth={1.5} /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 flex-shrink-0 overflow-x-auto">
                  {TABS.map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-2 px-5 py-4 text-[9px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap ${
                        activeTab === key
                          ? "border-[#D4A017] text-[#2C3E73]"
                          : "border-transparent text-gray-300 hover:text-gray-500"
                      }`}>
                      <Icon size={12} />
                      {label}
                      {key === "avance"     && formData.avanceObra?.activo             && <span className="ml-1 h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: colorOro }} />}
                      {key === "recorridos" && formData.recorridos3d?.some(r => r.url) && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10">

                  {/* INFO */}
                  {activeTab === "info" && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Datos generales</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Field label="Título *" value={formData.titulo}
                          onChange={t => setFormData(p => ({ ...p, titulo: t, slug: toSlug(t) }))}
                          placeholder="Ej: Residencial El Carmen" />
                        <Field label="Slug (URL)" value={formData.slug}
                          onChange={v => setFormData(p => ({ ...p, slug: v }))}
                          placeholder="residencial-el-carmen" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Field label="Ciudad" value={formData.ciudad}
                          onChange={v => setFormData(p => ({ ...p, ciudad: v }))}
                          placeholder="Trujillo" />
                        <div className="space-y-3">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Estado</label>
                          <select value={formData.estado} onChange={e => setFormData(p => ({ ...p, estado: e.target.value }))}
                            className="w-full border-b border-gray-100 py-3 text-sm font-light focus:border-[#D4A017] outline-none transition-colors bg-transparent"
                            style={{ color: colorAzul }}>
                            {ESTADO_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 bg-gray-50 border border-gray-100">
                        <div
                          onClick={() => setFormData(p => ({ ...p, active: !p.active }))}
                          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors`}
                          style={{ backgroundColor: formData.active ? colorAzul : "#e5e7eb" }}
                        >
                          <motion.div animate={{ x: formData.active ? 20 : 0 }} className="w-3 h-3 bg-white rounded-full shadow-sm" />
                        </div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Visible al público</label>
                      </div>
                    </div>
                  )}

                  {/* DESCRIPCIÓN */}
                  {activeTab === "descripcion" && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Sección "Sobre el Proyecto"</p>
                      </div>
                      <Field label="Título de la Sección" value={formData.descripcion.titulo}
                        onChange={v => setDesc("titulo", v)}
                        placeholder="Ej: Vive donde siempre soñaste" />
                      <Field label="Subtítulo / Lema" value={formData.descripcion.subtitulo}
                        onChange={v => setDesc("subtitulo", v)}
                        placeholder="Ej: Espacios creados para tu bienestar y confort" />
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Texto Descriptivo</label>
                        <textarea value={formData.descripcion.texto} onChange={e => setDesc("texto", e.target.value)} rows={6}
                          className="w-full border border-gray-100 p-4 text-sm font-light focus:border-[#D4A017] focus:outline-none transition-colors resize-none"
                          style={{ color: colorAzul }}
                          placeholder="Describe el proyecto en detalle..." />
                      </div>
                      {(formData.descripcion.titulo || formData.descripcion.subtitulo) && (
                        <div className="border border-dashed border-gray-200 p-6 bg-gray-50">
                          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Vista previa</p>
                          {formData.descripcion.titulo    && <h3 className="text-xl font-bold" style={{ color: colorAzul }}>{formData.descripcion.titulo}</h3>}
                          {formData.descripcion.subtitulo && <p className="text-sm text-gray-400 mt-1 italic">{formData.descripcion.subtitulo}</p>}
                          {formData.descripcion.texto     && <p className="text-xs text-gray-400 mt-3 leading-relaxed line-clamp-3">{formData.descripcion.texto}</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* IMÁGENES */}
                  {activeTab === "imagenes" && (
                    <div className="space-y-10">
                      {[
                        { field: "imagenPrincipal", label: "Imagen Principal (Card) *", upKey: "principal", handler: handleUploadPrincipal },
                        { field: "banner",           label: "Banner del Proyecto",       upKey: "banner",    handler: handleUploadBanner    },
                      ].map(({ field, label, upKey, handler }) => (
                        <div key={field}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">{label}</label>
                          </div>
                          {formData[field] ? (
                            <div className="group relative aspect-video overflow-hidden border border-gray-100">
                              <img src={formData[field]} className="h-full w-full object-cover" alt={label} />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: `${colorAzul}99` }}>
                                <button onClick={() => setFormData(p => ({ ...p, [field]: "" }))}
                                  className="bg-white p-4 text-red-500 hover:text-red-700 transition-colors shadow-xl">
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="flex aspect-video cursor-pointer flex-col items-center justify-center border border-dashed border-gray-200 bg-gray-50 hover:bg-white transition-all group">
                              {uploading[upKey]
                                ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                                    style={{ borderColor: `${colorOro} transparent ${colorOro} ${colorOro}` }} />
                                : <>
                                    <Upload size={30} className="mb-4 text-gray-200 group-hover:text-[#D4A017] transition-colors" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#2C3E73]">Cargar imagen</span>
                                  </>
                              }
                              <input type="file" accept="image/*" onChange={handler} className="hidden" />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CARACTERÍSTICAS */}
                  {activeTab === "caracteristicas" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Cards de características en la página pública</p>
                      </div>
                      {formData.caracteristicas.map((c, i) => {
                        const IcoComp = getIconComponent(c.icono);
                        return (
                          <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <IconPicker value={c.icono || "Home"} onChange={v => handleCaract(i, "icono", v)} />
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Título</label>
                                <input value={c.titulo || ""} onChange={e => handleCaract(i, "titulo", e.target.value)}
                                  className="w-full border-b border-gray-100 py-2 text-sm font-light focus:border-[#D4A017] outline-none transition-colors"
                                  style={{ color: colorAzul }}
                                  placeholder="Diseño moderno" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Descripción</label>
                                <input value={c.desc || ""} onChange={e => handleCaract(i, "desc", e.target.value)}
                                  className="w-full border-b border-gray-100 py-2 text-sm font-light focus:border-[#D4A017] outline-none transition-colors text-gray-500"
                                  placeholder="Detalle breve..." />
                              </div>
                            </div>
                            <button onClick={() => removeCaract(i)} className="text-gray-200 hover:text-red-400 transition-colors mt-6 flex-shrink-0"><X size={16} /></button>
                          </div>
                        );
                      })}
                      <button onClick={addCaract} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] mt-2" style={{ color: colorAzul }}>
                        <Plus size={14} style={{ color: colorOro }} /> Añadir característica
                      </button>
                    </div>
                  )}

                  {/* GALERÍA */}
                  {activeTab === "galeria" && (
                    <div className="space-y-6">
                      <label className="flex cursor-pointer items-center justify-center gap-3 border border-dashed border-gray-200 bg-gray-50 hover:bg-white transition-all py-8 group">
                        {uploading.galeria
                          ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                              style={{ borderColor: `${colorOro} transparent ${colorOro} ${colorOro}` }} />
                          : <>
                              <Upload size={24} className="text-gray-200 group-hover:text-[#D4A017] transition-colors" />
                              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#2C3E73]">Subir imágenes (múltiple)</span>
                            </>
                        }
                        <input type="file" accept="image/*" multiple onChange={handleUploadGaleria} className="hidden" />
                      </label>
                      {formData.galeria.length === 0 ? (
                        <div className="text-center py-12 text-gray-200"><FolderOpen size={40} className="mx-auto mb-3" /><p className="text-[9px] font-bold uppercase tracking-[0.3em]">Sin imágenes aún</p></div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {formData.galeria.map((img) => (
                            <div key={img.id} className="group relative border border-gray-100 overflow-hidden bg-gray-50">
                              <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" />
                              <button onClick={() => removeGalImg(img.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"><X size={12} /></button>
                              <div className="p-2">
                                <select value={img.categoria} onChange={e => handleGalCat(img.id, e.target.value)}
                                  className="w-full text-[9px] font-bold uppercase tracking-wide border border-gray-100 px-2 py-1 focus:border-[#D4A017] focus:outline-none bg-white text-gray-500">
                                  {formData.categoriasGaleria.filter(c => c.key !== "todos").map(c => (
                                    <option key={c.key} value={c.key}>{c.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CATEGORÍAS */}
                  {activeTab === "categorias" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Categorías del filtro de galería</p>
                      </div>
                      {formData.categoriasGaleria.map((cat, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <input value={cat.label} onChange={e => handleCatG(i, "label", e.target.value)} disabled={i === 0}
                              className="border-b border-gray-100 py-2 text-sm font-light focus:border-[#D4A017] outline-none transition-colors disabled:text-gray-200 disabled:cursor-not-allowed"
                              style={{ color: i === 0 ? undefined : colorAzul }}
                              placeholder="Nombre (ej: SALA COMEDOR)" />
                            <input value={cat.key} readOnly className="border-b border-gray-50 py-2 text-[11px] font-mono text-gray-300" placeholder="key (auto)" />
                          </div>
                          {i !== 0 && <button onClick={() => removeCatG(i)} className="text-gray-200 hover:text-red-400 transition-colors"><X size={16} /></button>}
                        </div>
                      ))}
                      <button onClick={addCatG} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] mt-4" style={{ color: colorAzul }}>
                        <Plus size={14} style={{ color: colorOro }} /> Añadir categoría
                      </button>
                    </div>
                  )}

                  {/* RECORRIDOS 3D */}
                  {activeTab === "recorridos" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Tours y recorridos virtuales 3D</p>
                      </div>
                      {(formData.recorridos3d || []).map((r, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Nombre del Recorrido" value={r.titulo || ""}
                              onChange={v => handleRec(i, "titulo", v)}
                              placeholder="Ej: Dpto. Tipo A — 2 Dormitorios" />
                            <Field label="URL del Tour 3D" value={r.url || ""}
                              onChange={v => handleRec(i, "url", v)}
                              placeholder="https://..." />
                          </div>
                          {r.url && (
                            <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-6 text-emerald-500 hover:text-emerald-700 transition-colors flex-shrink-0"><ChevronRight size={18} /></a>
                          )}
                          <button onClick={() => removeRec(i)} className="text-gray-200 hover:text-red-400 transition-colors mt-6 flex-shrink-0"><X size={16} /></button>
                        </div>
                      ))}
                      <button onClick={addRec} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] mt-2 text-emerald-600">
                        <Plus size={14} /> Añadir Recorrido 3D
                      </button>
                      {(formData.recorridos3d || []).some(r => r.titulo && r.url) && (
                        <div className="border border-dashed border-emerald-200 p-4 bg-emerald-50 mt-2">
                          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-600 mb-3">Recorridos configurados</p>
                          {(formData.recorridos3d || []).filter(r => r.titulo && r.url).map((r, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                              <Play size={10} className="text-emerald-400" />
                              <span className="text-[10px] font-bold text-emerald-700">{r.titulo}</span>
                              <span className="text-[9px] text-emerald-400 truncate">{r.url}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* AVANCE DE OBRA */}
                  {activeTab === "avance" && (
                    <div className="space-y-8">
                      {/* Toggle activo */}
                      <div className={`flex items-center justify-between p-5 border-2 transition-all ${formData.avanceObra?.activo ? "border-[#D4A017] bg-amber-50" : "border-gray-100 bg-gray-50"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 transition-colors`} style={{ backgroundColor: formData.avanceObra?.activo ? colorOro : "#e5e7eb" }}>
                            <HardHat size={18} className="text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: colorAzul }}>Avance de Obra</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">{formData.avanceObra?.activo ? "Visible en la página del proyecto" : "Oculto al público"}</p>
                          </div>
                        </div>
                        <button onClick={() => setAvance("activo", !formData.avanceObra?.activo)}>
                          {formData.avanceObra?.activo
                            ? <ToggleRight size={36} style={{ color: colorOro }} />
                            : <ToggleLeft  size={36} className="text-gray-300" />
                          }
                        </button>
                      </div>

                      {/* Descripción */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Descripción del Avance</label>
                        <textarea value={formData.avanceObra?.descripcion} onChange={e => setAvance("descripcion", e.target.value)} rows={4}
                          className="w-full border border-gray-100 p-4 text-sm font-light focus:border-[#D4A017] focus:outline-none transition-colors resize-none"
                          style={{ color: colorAzul }}
                          placeholder="Ej: Actualmente nos encontramos en la fase de vaciado de columnas..." />
                      </div>

                      {/* Enlace genérico */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Enlace del Avance</label>
                        <div className="flex items-center gap-3 border-b border-gray-100 focus-within:border-[#D4A017] transition-colors pb-1">
                          <LinkIcon size={16} className="text-gray-300 flex-shrink-0" />
                          <input value={formData.avanceObra?.enlace || ""} onChange={e => setAvance("enlace", e.target.value)}
                            className="flex-1 py-3 text-sm font-light focus:outline-none bg-transparent placeholder:text-gray-200"
                            style={{ color: colorAzul }}
                            placeholder="https://..." />
                          {formData.avanceObra?.enlace && (
                            <a href={formData.avanceObra.enlace} target="_blank" rel="noopener noreferrer"
                              className="text-[9px] font-bold uppercase tracking-[0.2em] hover:underline flex-shrink-0"
                              style={{ color: colorOro }}>
                              Abrir ↗
                            </a>
                          )}
                        </div>
                        <p className="text-[9px] text-gray-300 mt-1">Puede ser un post de Facebook, YouTube, Instagram, un PDF o cualquier URL.</p>
                      </div>

                      {/* Vista previa iframe si el enlace lo permite */}
                      {formData.avanceObra?.enlace && (
                        <div>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="h-3 w-[2px]" style={{ backgroundColor: colorOro }} />
                            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Vista Previa</label>
                          </div>
                          <div className="border border-gray-100 bg-gray-50 flex items-center justify-center p-4 min-h-[80px]">
                            {formData.avanceObra.enlace.includes("facebook.com") ? (
                              <iframe
                                src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(formData.avanceObra.enlace)}&show_text=true&width=560`}
                                width="560" height="380"
                                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                                scrolling="no" frameBorder="0" allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
                            ) : formData.avanceObra.enlace.includes("youtube.com") || formData.avanceObra.enlace.includes("youtu.be") ? (
                              (() => {
                                const ytId = formData.avanceObra.enlace.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
                                return ytId
                                  ? <iframe width="560" height="315" style={{ maxWidth: "100%" }}
                                      src={`https://www.youtube.com/embed/${ytId}`}
                                      frameBorder="0" allowFullScreen
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                                  : <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Vista previa no disponible</p>;
                              })()
                            ) : (
                              <div className="text-center py-4">
                                <LinkIcon size={24} className="mx-auto mb-2 text-gray-200" />
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Enlace guardado</p>
                                <a href={formData.avanceObra.enlace} target="_blank" rel="noopener noreferrer"
                                  className="text-[9px] font-bold underline mt-1 block" style={{ color: colorOro }}>
                                  {formData.avanceObra.enlace.length > 50 ? formData.avanceObra.enlace.slice(0, 50) + "…" : formData.avanceObra.enlace}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {!formData.avanceObra?.enlace && (
                        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100">
                          <LinkIcon size={14} className="text-amber-300 flex-shrink-0" />
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500">Ingresa un enlace para habilitar la sección</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Footer */}
                <div className="flex sticky bottom-0 border-t border-gray-50 flex-shrink-0">
                  <button onClick={() => setShowModal(false)}
                    className="flex-1 py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-[#2C3E73] hover:bg-gray-50 transition-all">
                    Descartar
                  </button>
                  <button onClick={handleSave} disabled={uploading.principal || uploading.banner || uploading.galeria}
                    className="flex-[1.5] py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-all disabled:opacity-50 relative overflow-hidden group"
                    style={{ backgroundColor: colorAzul }}>
                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"
                      style={{ backgroundColor: colorOro }} />
                    <div className="relative flex items-center justify-center gap-3">
                      <Save size={14} style={{ color: colorOro }} />
                      {editingProyecto ? "Guardar Cambios" : "Crear Proyecto"}
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
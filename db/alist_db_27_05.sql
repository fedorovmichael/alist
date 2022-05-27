--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.24
-- Dumped by pg_dump version 9.5.24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.categories (
    id character varying(150) NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.categories OWNER TO manager;

--
-- Name: list; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.list (
    id character varying(150),
    name character varying(250),
    active boolean DEFAULT false NOT NULL
);


ALTER TABLE public.list OWNER TO manager;

--
-- Name: list_items; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.list_items (
    id character varying(150),
    name character varying(250),
    count integer,
    selected boolean,
    list_id character varying(150),
    complete boolean DEFAULT false NOT NULL,
    category_id character varying(150),
    measures character varying(50)
);


ALTER TABLE public.list_items OWNER TO manager;

--
-- Name: phone_numbers; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.phone_numbers (
    id character varying(150) NOT NULL,
    name character varying(250) NOT NULL,
    number character varying(250) NOT NULL,
    type character varying(100) NOT NULL,
    list_id character varying(150) NOT NULL
);


ALTER TABLE public.phone_numbers OWNER TO manager;

--
-- Name: user_account; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.user_account (
    id character varying(150) NOT NULL,
    name character varying(200) NOT NULL,
    login character varying(200) NOT NULL,
    email character varying(250),
    password character varying(250) NOT NULL,
    enable boolean DEFAULT true NOT NULL
);


ALTER TABLE public.user_account OWNER TO manager;

--
-- Name: users_lists; Type: TABLE; Schema: public; Owner: manager
--

CREATE TABLE public.users_lists (
    user_id character varying(150) NOT NULL,
    list_id character varying(150) NOT NULL,
    ownership character varying(100) NOT NULL
);


ALTER TABLE public.users_lists OWNER TO manager;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.categories (id, name) FROM stdin;
g552ju164	שתיה
u7fjjvqh6	חד-פעמי
78vwy07mc	קטניות
20675h0be	חומרי ניקוי
vjrjhal7r	 שמנים וטחינה
n1c77r0fr	רטבים
kv1nwfn3h	תבלינים
gxq0ef4dm	פסטות
st4ztd9ij	ירק
fwryp47l0	ירקות
urga5nmmx	פירות
4mu0qigjm	שימורים
nxiztiah1	קפה, אגוזים, פירות
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.list (id, name, active) FROM stdin;
idt5et80n	טסט	f
9l26gjtz4	לחם	f
sapnkd5s2	גבינות	f
ted5oqic9	בשרים	f
60o0slea7	חד-פעמי	f
w5ebn7oj3	שוק	f
30xf4uvwr	חומרי גלם	f
nby9jmnei		f
729pzy794	חמים וטעים	f
jr9ds9fyu	שימורי איכות	t
\.


--
-- Data for Name: list_items; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.list_items (id, name, count, selected, list_id, complete, category_id, measures) FROM stdin;
0wy9cqb7d	קפיה פלפל קלוי A10	5	t	2h055lq91	f	4mu0qigjm	\N
hkrpoqvyf	דלי מטליות לניקוי	1	t	2h055lq91	f	20675h0be	\N
xslnbmkye	פפריקה מתוקה	1	f	30xf4uvwr	f	\N	\N
8oej5myn1	שמן קנולה 3 ליטר 38002	2	t	jr9ds9fyu	t	vjrjhal7r	\N
wwlx7gncj	שמן קנולה 3 ליטר	2	t	2h055lq91	f	vjrjhal7r	\N
v4wu961fb	אגוזי קשיו 1 קילו	1	t	2h055lq91	f	nxiztiah1	\N
b9kazxcw4	כפפות לטקס 100 504006	4	t	jr9ds9fyu	t	u7fjjvqh6	\N
uhwkwhmwb	נייר לקופה רחב	1	f	2h055lq91	f	u7fjjvqh6	\N
y5bfg5vsj	יין לבן	3	f	2h055lq91	f	g552ju164	\N
cqtkwgb1d	מלח מנות	1	f	2h055lq91	f	kv1nwfn3h	\N
0aso7y0yy	מגבונים לחים	1	f	2h055lq91	f	\N	\N
h1q64tufq	חמאה מנות	1	f	2h055lq91	f	vjrjhal7r	\N
176ksy5i1	קציצות עדשים עם ירקות	1	t	729pzy794	f	\N	קרטון
nyinzkboy	שקד טבעי 1 קילו	1	f	2h055lq91	f	nxiztiah1	\N
cpv73gyu9	חציל	1	f	w5ebn7oj3	f	fwryp47l0	\N
33xatwicv	חסה	1	f	w5ebn7oj3	f	st4ztd9ij	\N
cs3f2idcj	שמיר 1 קילו	1	f	2h055lq91	f	kv1nwfn3h	\N
rocuo3clt	אפונה קפואה	1	t	30xf4uvwr	f	\N	\N
vh6p5fu3z	חרדל דיזון	1	f	2h055lq91	f	n1c77r0fr	\N
00bngn5j9	מים קטן 0.5	1	f	2h055lq91	f	g552ju164	\N
deeaf8qle	קוסקוס מלא	1	f	2h055lq91	f	78vwy07mc	\N
zzssvm78l	שקיות גופיה	10	f	2h055lq91	f	u7fjjvqh6	\N
bak1ehma0	שמן זית מעורב 4 ליטר	2	f	2h055lq91	f	vjrjhal7r	\N
zrliuog7v	test 2	1	f	3amj9vvh4	f	\N	\N
lydxg3v8k	test 3	1	f	3amj9vvh4	f	\N	\N
1m8clnoly	test 4	1	f	3amj9vvh4	f	\N	\N
kiuxplmcn	מסיר שומנים	1	f	2h055lq91	f	20675h0be	\N
d3atfw0jg	כיפה 55	1	f	60o0slea7	f	\N	קרטון
wprqxznwy	כפות קשיח	1	f	60o0slea7	f	\N	קרטון
v3tj9t4l1	בולגרית	1	t	sapnkd5s2	f	\N	יח
wj4a29tgl	שעועית קפואה	1	t	30xf4uvwr	f	\N	\N
nuxnt8b7i	אורז חתולים 5 קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
yr5b5yn4z	פסטרמה רומנית	2	f	ted5oqic9	f	\N	יח
yvuw5umfj	פסטרמה מעושנת איתן	3	f	ted5oqic9	f	\N	יח
bx3j5lag7	אורגנו	1	t	2h055lq91	f	kv1nwfn3h	\N
wirh2aegu	קינואה 5 קג	1	t	2h055lq91	f	78vwy07mc	\N
zj2serls7	סכין קשיח	1	f	60o0slea7	f	\N	קרטון
5cppgl0p7	כוסות אספרסו	3	f	60o0slea7	f	\N	יחידות
69sce7gko	כובסה לסלט אישי  270 	1	f	2h055lq91	f		\N
lowtrvwwt	שניצל כרובית	1	f	729pzy794	f	\N	קרטון
vanwv4nwr	לחמניה ארוך קטן (מחמצת)	35	t	9l26gjtz4	t	\N	\N
ghc1l528b	טונה ואקום 17352	3	t	jr9ds9fyu	t	vjrjhal7r	\N
jnklld946	מזלג קשיח	1	f	60o0slea7	f	\N	קרטון
p6ma41vdf	גאלה	3	t	30xf4uvwr	f	\N	\N
0norxc9ll	כיפה 35	2	f	60o0slea7	f	\N	קרטון
negaephf3	חצי בגט חום	1	f	9l26gjtz4	f	\N	\N
ua6n1ydvk	גבטה לבן	1	f	9l26gjtz4	f	\N	\N
82h2zrdan	סוכר מנות	1	f	2h055lq91	f		\N
kfrvm89pg	אגוז מלך 1 קילו	1	f	2h055lq91	f	nxiztiah1	\N
ofjmli17k	נוזל לניקוי חולונות	1	f	2h055lq91	f	20675h0be	\N
1shfx824s	בירה כהה	1	f	2h055lq91	f	g552ju164	\N
ubccg8k77	זיתים טבעות שחור 9 ליטר	1	t	2h055lq91	f	4mu0qigjm	\N
vjp8gmb7e	נוזל לניקוי רצפה	1	t	2h055lq91	f	20675h0be	\N
4rlvxb6yp	מיץ לימון אמיתי 4 ליטר	1	t	2h055lq91	f	n1c77r0fr	\N
ovkrxofg6	קולה 1.5	1	f	2h055lq91	f	g552ju164	\N
6fswdmgjr	אפונה A2 זול	3	f	2h055lq91	f	4mu0qigjm	\N
fgvjgptat	טופו	2	f	sapnkd5s2	f	\N	קג
bd7wsxviz	פטרוזיליה	5	f	w5ebn7oj3	f	st4ztd9ij	\N
ea81srdc1	אפונה קפואה	1	t	q5wvqz3dn	f	\N	\N
ydzzwuvqm	ביצים	3	t	sapnkd5s2	f	\N	
2qxuv2fku	פטריות	1	f	w5ebn7oj3	f	st4ztd9ij	\N
vbzr8yojx	לביבות ירקות 	1	f	729pzy794	f	\N	קרטון
6hkgesob2	תפוח אדמה	1	f	w5ebn7oj3	f	fwryp47l0	\N
ifknx89i2	רצועות עוף	1	f	729pzy794	f	\N	קרטון
jubwgrsl8	קציצות בורגול	1	f	729pzy794	f	\N	קרטון
e3w6mm91a	דים סאם עוף	1	f	729pzy794	f	\N	קרטון
4te5s3i5n	קציצות בטטה	1	f	729pzy794	f	\N	קרטון
zzzlb7tbh	דים סאם ירקות	1	f	729pzy794	f	\N	קרטון
p6z4z1vi8	אבוקדו 23ש"ח	1	f	729pzy794	f	\N	קילו
of1bbwtq5	חומוס 5 קג 24002	1	f	jr9ds9fyu	f	78vwy07mc	\N
vj16un86j	סודה קטן 250 50011	1	f	jr9ds9fyu	f	g552ju164	\N
j58bl2em7	יין אדום	3	f	jr9ds9fyu	f	g552ju164	\N
oosuoysun	קמח	10	f	jr9ds9fyu	f	gxq0ef4dm	קילו
bw3wyc5ic	סילן דלי 5 קג 734390	1	f	jr9ds9fyu	f	n1c77r0fr	\N
3kogg1jwe	עדשים ירוקים 5 ק"ג 24006	1	f	jr9ds9fyu	f	78vwy07mc	\N
x3hdcvdde	תירס קפואה	1	t	q5wvqz3dn	f	\N	\N
fet88vv0o	מלפפון 66-80 9 ליטר 13025	1	t	jr9ds9fyu	t	4mu0qigjm	\N
nftnildgs	חלב	2	f	sapnkd5s2	f	\N	ליטר
6k96193kp	שמנת	1	t	q5wvqz3dn	f	\N	\N
qf2y5zgfn	גבינה	1	t	q5wvqz3dn	f	\N	\N
7x0ao4i3j	עגבניות מיובשות 2.5 ק"ג 18136	1	f	jr9ds9fyu	f	gxq0ef4dm	\N
urlnimhen	מעדן אווז	2	f	ted5oqic9	f	\N	יח
2sjfze3xs	סכין קשיח	1	f	2h055lq91	f	u7fjjvqh6	\N
iypg2uo2u	כוסות לשתיה קרה	1	f	2h055lq91	f	u7fjjvqh6	\N
64saawrtm	פפריקה מתוקה	2	f	2h055lq91	f	kv1nwfn3h	\N
8dqk2hwu4	קציצות קינוא עם חמוציות	1	t	729pzy794	f	\N	קרטון
z7awxm3rw	מיונז דלי 5 קג	1	f	2h055lq91	f	n1c77r0fr	\N
87m6xzlwp	תבלינים קארי	1	f	2h055lq91	f	kv1nwfn3h	\N
fhkrmhcec	תבלינים קומון	1	f	2h055lq91	f	kv1nwfn3h	\N
o2utgvio3	דפי לזניה	6	f	2h055lq91	f		\N
wuxhnpq9f	קופסא 375 	1	f	60o0slea7	f	\N	קרטון
44r2v807a	קפיה פלפל קלוי A10 12073	3	t	jr9ds9fyu	t	4mu0qigjm	\N
j0rkbzs6l	מיונז	2	t	30xf4uvwr	f	\N	\N
8fsg8x86p	אורז יסמין חתולים 5קג	1	t	2h055lq91	f	78vwy07mc	\N
p9fyio16y	אפונה 5 קג	1	t	2h055lq91	f	78vwy07mc	\N
agml97kcu	נקניקיות קנקרס	5	f	ted5oqic9	f	\N	יח
r81jvvxfx	סלק קוביות 4 קייג	1	t	2h055lq91	f	4mu0qigjm	\N
2cz64cdx7	זיתים טבעות ירוק 9 ליטר	1	t	2h055lq91	f	4mu0qigjm	\N
4t13536u7	קרוטונים	1	t	2h055lq91	f	gxq0ef4dm	\N
i1yyazrcq	מלח	1	t	2h055lq91	f	kv1nwfn3h	\N
r0l7a61xn	תבלינים פלפל שחור	1	t	2h055lq91	f	kv1nwfn3h	\N
hg500gscc	תירס קפוא	2	t	30xf4uvwr	f	\N	\N
gn2i3ebxa	גריסים 5 קג פנינה	1	f	2h055lq91	f	78vwy07mc	\N
svu30v5hw	אבקת שום	1	f	2h055lq91	f	kv1nwfn3h	\N
mpccir4pb	איטריות שעועית	6	f	2h055lq91	f	gxq0ef4dm	\N
uepalyq7x	שמנת 32%	2	f	sapnkd5s2	f	\N	יח
hrkieoe85	פוקצה	5	f	9l26gjtz4	f	\N	\N
aujt55lpd	מפיות דיספנסר	1	f	2h055lq91	f	u7fjjvqh6	\N
y6qcdg1xv	קיסם שיניים	1	f	2h055lq91	f	u7fjjvqh6	\N
fal9gu9t9	שקיות נייר בתאבון	1	f	2h055lq91	f	u7fjjvqh6	\N
4pzrduj7j	המבורגר	1	f	9l26gjtz4	f	\N	\N
8cny766y1	קולה פחיות 0.33	1	f	2h055lq91	f	g552ju164	\N
2olkmbi8l	בייגל טוסט	10	f	9l26gjtz4	f	\N	\N
quzuuyuk6	כרם קוקוס	6	f	2h055lq91	f	4mu0qigjm	\N
7jkuyd2mk	פטריות 2 ליטר	1	f	2h055lq91	f	4mu0qigjm	\N
ivyd2s6w1	חצי בגט לבן	2	f	9l26gjtz4	f	\N	\N
n9mzibx0u	סחוג	1	f	2h055lq91	f	n1c77r0fr	\N
z7rwepp09	גבטה חום	10	t	9l26gjtz4	f	\N	\N
f5c98nbkg	זתר	1	f	2h055lq91	f	kv1nwfn3h	\N
vonpra976	לחמניה קשר	5	t	9l26gjtz4	f	\N	\N
3exm7w57a	סקום עטוף 5 יח	1	f	2h055lq91	f	u7fjjvqh6	\N
d32zy1koy	בירה בהירה	1	f	2h055lq91	f	g552ju164	\N
f2stypk6t	חומוס עדן A2 זול	3	f	2h055lq91	f	4mu0qigjm	\N
yhblk5r8s	רוטב בלסמי 4 ליטר	1	f	2h055lq91	f	n1c77r0fr	\N
us1696svn	רוטב צילי מתוק 4 ליטר	1	f	2h055lq91	f	n1c77r0fr	\N
gmkdv2zkh	 כוסמת 5קג	1	t	2h055lq91	f	78vwy07mc	\N
ferspzg5z	מים 1.5	1	f	2h055lq91	f	g552ju164	\N
olkuuyls8	 בורגול 5קג	1	t	2h055lq91	f	78vwy07mc	\N
2cg6wxw8h	סודה	1	f	2h055lq91	f	g552ju164	\N
xkcpg9k1g	כפפות לטקס	6	f	2h055lq91	f	u7fjjvqh6	\N
6jvta36p6	רביולי בטטה	1	t	729pzy794	f	\N	קרטון
dgx5xi6nw	כורכום	1	f	2h055lq91	f	kv1nwfn3h	\N
2ikc73x34	טונה א 1 קג	1	f	2h055lq91	f	vjrjhal7r	\N
4fob2oi61	קולה פחיות דיאט 0.33	1	f	2h055lq91	f	g552ju164	\N
viiq3bs08	נייר ידיים 1183	1	f	2h055lq91	f	u7fjjvqh6	\N
jhgqrg4mp	כוסות לשתיה חמה	1	f	2h055lq91	f	u7fjjvqh6	\N
jmtwwiji0	קרם שמנת	1	f	sapnkd5s2	f	\N	יח
a0jqrr2s4	חמאה	4	f	sapnkd5s2	f	\N	גר
xl1fu08n0	סלמון	500	f	sapnkd5s2	f	\N	גר
8mynp299j	אבוקדו	1	f	sapnkd5s2	f	\N	יח
8f6urc7mc	גבינה צהובה	1	f	sapnkd5s2	f	\N	קג
s8ib5h848	רביולי תפוח אדמה	1	f	729pzy794	f	\N	קרטון
j3ll39it5	פלפל חריף	1	f	w5ebn7oj3	f	\N	
b8hv4vc9i	רביולי פטריות	1	f	729pzy794	f	\N	קרטון
zxxuz75xq	קולה פחיות זירו	1	f	jr9ds9fyu	f	g552ju164	\N
9nsp09mfx	עדשים אדומים 5קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
yakablep6	ספרייט זירו	1	f	jr9ds9fyu	f	g552ju164	
l8jtc68py	קוקה קולה זירו 1.5	1	f	jr9ds9fyu	f	g552ju164	\N
bpdbnrwla	מפיות רטובות האגיס	1	f	jr9ds9fyu	f	20675h0be	יח
06l1p6ynm	קינואה 5 ק"ג 24075	1	f	jr9ds9fyu	f	78vwy07mc	\N
3u3n63uju	גבינה צהובה פרוס	2	f	jr9ds9fyu	f	vjrjhal7r	\N
dh8whhlt2	תה מעושן	1	f	ted5oqic9	f	\N	יח
5z4rz42bv	קפה פולים	1	t	2h055lq91	f	nxiztiah1	\N
lns6ehnmc	חמוציות	2	t	2h055lq91	f	nxiztiah1	\N
hiloor2bn	עגבניות מעובשות	1	t	2h055lq91	f	gxq0ef4dm	\N
84ycwdxwn	סילאן	1	f	2h055lq91	f	n1c77r0fr	\N
j61ng81zd	מרקיות צבעוניות	1	f	60o0slea7	f	\N	קרטון
7rjwqvsd7	מיני בר 80	1	f	60o0slea7	f	\N	קרטון
qdfksunsn	בצל יבש	1	f	2h055lq91	f	kv1nwfn3h	\N
xwvmhqmgp	ספגטי	6	f	2h055lq91	f	gxq0ef4dm	\N
6bf95c62q	עדשים אדומות 5 קג	1	f	2h055lq91	f	78vwy07mc	\N
l1dmis51q	פיוז טי	1	f	2h055lq91	f	g552ju164	\N
5ey7ukmro	קולה זירו 1.5	1	f	2h055lq91	f	g552ju164	\N
4p6ug09si	קטשופ 13 קג	1	f	2h055lq91	f	n1c77r0fr	\N
wcdta34v4	כפפות ניילון 100 יח 504446	6	t	jr9ds9fyu	t	u7fjjvqh6	יח
43ij65ax0	רוטב סויה	1	f	2h055lq91	f	n1c77r0fr	\N
xwcsiytuc	פלפל מנות	1	f	2h055lq91	f	kv1nwfn3h	\N
37ocbders	מזלג קשיח	1	f	2h055lq91	f	u7fjjvqh6	\N
y20flkw51	נוזל לניקוי כלים	1	f	2h055lq91	f	20675h0be	\N
uvwkokl8l	בירה שחור 	1	f	2h055lq91	f	g552ju164	\N
9zaxfc40u	טורטיה	3	f	2h055lq91	f	gxq0ef4dm	\N
x3jadqvmr	יין אדום	2	f	2h055lq91	f	g552ju164	\N
pp9aoli7s	מיני בר 80	1	f	2h055lq91	f	u7fjjvqh6	\N
g37ordjtg	כפפות ניילון	6	f	2h055lq91	f	u7fjjvqh6	\N
m6o5rgxis	קפות למרק קשיח	1	f	2h055lq91	f	u7fjjvqh6	\N
otseaxlzj	נייר פרגמנט נשלף בקרטון	1	f	2h055lq91	f	u7fjjvqh6	\N
hcotl5dkp	גבינה עלמה פרוסה	5	f	2h055lq91	f	vjrjhal7r	\N
6bwh97nkn	חומוס 5 קג	1	f	2h055lq91	f	78vwy07mc	\N
8fxv3ku4q	רוטב צילי חריף 4 ליטר	1	f	2h055lq91	f	n1c77r0fr	\N
l72r8e1r8	רוטב ויניגרט גלון 4 ליטר	1	f	2h055lq91	f	n1c77r0fr	\N
01q5thm6j	קיש פטריות	1	f	729pzy794	f	\N	קרטון
9pln1cw7c	עדשים ירוק 5קג	2	t	2h055lq91	f	78vwy07mc	\N
lmtg25dkq	פלפל חלפיניו A10	2	t	2h055lq91	f	4mu0qigjm	\N
8fg7xlhat	מלפפון 66-80 9 ליטר	2	t	2h055lq91	f	4mu0qigjm	\N
zfavux5gs	טחינה 3 קג	3	t	2h055lq91	f	vjrjhal7r	\N
d06qv4bj5	מיץ לימון יכין 4 ליטר	1	t	2h055lq91	f	n1c77r0fr	\N
5ztrfqvp6	ניילון ניצמד	1	f	2h055lq91	f	u7fjjvqh6	\N
ne9jca9h0	נייר ידיים 1169	1	f	2h055lq91	f	u7fjjvqh6	\N
uywvmdu7o	רוטב טריקי 4 ליטר	1	f	2h055lq91	f	n1c77r0fr	\N
5fdh7jyb3	שעועית לבנה 5 קג	1	f	2h055lq91	f	78vwy07mc	\N
etqoyb0xi	כוסות אספרסו	6	f	2h055lq91	f	u7fjjvqh6	\N
hriuoqsgt	חמץ בן יין לבן	1	f	2h055lq91	f	n1c77r0fr	\N
2g3sjjk5w	 פסטה אטריות	1	f	2h055lq91	f	gxq0ef4dm	\N
dwub29lfm	עדשים שחורות 5 קג	1	f	2h055lq91	f	78vwy07mc	\N
1zb03fv4h	פסטה צבעוני 5 קג	1	f	2h055lq91	f	gxq0ef4dm	\N
oytkntys3	סודה קטן	1	f	2h055lq91	f	g552ju164	\N
1zkpyu1av	מיכרו  בר 30 cc	6	f	2h055lq91	f	u7fjjvqh6	\N
c270dth3c	קולה פחיות זירו 0.33	1	f	2h055lq91	f	g552ju164	\N
k76thx3k9	רוטב סויה 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
bm4pxzwc4	קש לשתיה	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
5h8rq990t	מגבת חוגלה 1169 504016	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
5ou77k7ua	שקית אשפה שרוך 60 יח	4	f	jr9ds9fyu	f	u7fjjvqh6	\N
yfgjxu6rx	נוזל לניקוי כלים 4 ליטר	1	f	jr9ds9fyu	f	20675h0be	\N
tz4rdxowo	סחוג	1	f	jr9ds9fyu	f	n1c77r0fr	\N
1f9c8suhv	כוסות אספרסו 14538	3	f	jr9ds9fyu	f	u7fjjvqh6	\N
zqkm9c2wp	קיסמי שיניים	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
pw3f99syp	רוטב צילי מתוק 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
ih2gua8v6	טורטיה	6	f	jr9ds9fyu	f	gxq0ef4dm	
5w0dfahfb	 חומר אקונומיקה 4 ליטר	1	f	jr9ds9fyu	f	20675h0be	יח
l8f2kcfrn	גרעיני חמניה	1	f	jr9ds9fyu	f	nxiztiah1	קילו
ty2lw6f76	CCמיקרו בר 30	3	f	jr9ds9fyu	f	u7fjjvqh6	\N
iwlh52n7n	נייר כסף	1	f	jr9ds9fyu	f	u7fjjvqh6	יח
ohfu3nsng	גרעיני דלעת	1	f	jr9ds9fyu	f	nxiztiah1	קילו
pab76vx0p	פסטרמה על גחלים איתן	2	f	ted5oqic9	f	\N	חצי
dk8worqnj	שקיות גופיה לבן	1	f	60o0slea7	f	\N	
gocnjwxhv	סלרי	1	f	w5ebn7oj3	f	st4ztd9ij	\N
0yxgva87v	בולגרית	5	t	idt5et80n	f	\N	
903q0mvuu	טופו	1	t	idt5et80n	f	\N	קג
gn7xnxhdb	ביצים	7	t	idt5et80n	f	\N	יח
tni6zqe42	טסט 	6	t	idt5et80n	f	\N	גר
t8oqqdgoq	פרסה	1000	f	w5ebn7oj3	f	st4ztd9ij	\N
k3mbn15c8	נענע	1	f	w5ebn7oj3	f	st4ztd9ij	\N
cfoek48cl	דלי מטליות לניקוי 503705	1	f	jr9ds9fyu	f	20675h0be	\N
tcaobspf2	צלחות 500CC	1	f	60o0slea7	f	\N	קרטון
p4jxr6e70	כוסמת 5 ק"ג 24059	1	f	jr9ds9fyu	f	78vwy07mc	\N
208mpslld	קופסא ירושלמי 500	1	f	60o0slea7	f	\N	קרטון
us5wwqux4	בורגול עבה 5 ק"ג	1	f	jr9ds9fyu	f	78vwy07mc	\N
4gwoqusbh	כרוב סגול	1	f	w5ebn7oj3	f	fwryp47l0	\N
ind04dzor	אפונה 5 קג 24003	1	f	jr9ds9fyu	f	78vwy07mc	\N
gry7lapqk	קולה פחיות 331157	1	f	jr9ds9fyu	f	g552ju164	\N
ws1kutgep	חרדל דיזון גרגרים	1	f	jr9ds9fyu	f	n1c77r0fr	\N
w6f1qw5t6	מלח שולחן 16010	12	f	jr9ds9fyu	f	kv1nwfn3h	\N
o4g1kva3a	קוקה קולה 1.5 18007	1	f	jr9ds9fyu	f	g552ju164	\N
utw95ewc9	רוטב ברביקיו 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	יח
lb9swpo9x	קארי	1	f	jr9ds9fyu	f	kv1nwfn3h	null
aesn61zg2	חוויאג	1	f	jr9ds9fyu	f	kv1nwfn3h	גר
zyaicafzm	רוטב סצואן 4 ליטר Knorr	1	f	jr9ds9fyu	f	n1c77r0fr	יח
vl31r66g4	בצל	1	f	w5ebn7oj3	f	fwryp47l0	\N
5tdsjixsc	דפי לזניה	6	f	jr9ds9fyu	f	gxq0ef4dm	\N
6zrq83n0e	שום	1	f	w5ebn7oj3	f	st4ztd9ij	\N
x2to5rxnh	סודה 1.5 54100	1	f	jr9ds9fyu	f	g552ju164	\N
i5h8vjj5b	תפוח עץ	1	f	w5ebn7oj3	f	urga5nmmx	\N
smat5n7ly	תפוח אדומה קטן	1	f	w5ebn7oj3	f	st4ztd9ij	\N
odgdpkwlg	בצל סגול	1	f	w5ebn7oj3	f	fwryp47l0	\N
rf163g58g	שמיר	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
uwws85p0q	בטטה	2	f	w5ebn7oj3	f	fwryp47l0	\N
njsw3siam	תפוזים	1	f	w5ebn7oj3	f	urga5nmmx	\N
kerjzc2fg	כוסות לשתיה חמה	3	f	jr9ds9fyu	f	u7fjjvqh6	יח
d90leu4b1	יין לבן	6	f	jr9ds9fyu	f	g552ju164	\N
m5wzay84x	מים 1.5 17011	1	f	jr9ds9fyu	f	g552ju164	\N
5orjun6s5	בזיליקום	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
s43xubxwg	קולה פחיות דיאט 	1	f	jr9ds9fyu	f	g552ju164	\N
vgifkpvyb	מוסקת אגוז	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
92uvac866	נוזל לניקוי חלונות 4 ליטר	1	f	jr9ds9fyu	f	20675h0be	\N
mlxc16p7m	פטרוזיליה	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
g169yexpk	מזלג קשיח	6	f	jr9ds9fyu	f	u7fjjvqh6	\N
rryno2nzq	 ניילון נצמד צר	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
fzmqp788z	חומץ בן יין לבן 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
53wrsk1qj	כוסברה	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
ln7gzlb2g	פלפל מנות 16032	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
ywe69gd7m	ספגטי 400 זול 331179	1	f	jr9ds9fyu	f	gxq0ef4dm	\N
kdn3b2t1s	קרם קוקוס	6	f	jr9ds9fyu	f	4mu0qigjm	\N
9339i6imp	מפיות דיספנסר	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
h168ss3pz	כוסות לשתיה קרה	3	f	jr9ds9fyu	f	u7fjjvqh6	יח
vumsc6241	פפריקה מתוקה	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
8lqna5qeq	בזיליקום	1	f	w5ebn7oj3	f	st4ztd9ij	\N
pcgsgdlpr	קישוים	1	f	w5ebn7oj3	f	fwryp47l0	\N
hef63nj9i	שרי	1	f	w5ebn7oj3	f	fwryp47l0	\N
owyy39cp1	קרפלך תפוח אדומה	1	f	729pzy794	f	\N	קרטון
rk095lzlk	קובה צמחי	1	f	729pzy794	f	\N	קרטון
rlzwxkc6u	קולה זירו בקבוק 0.5	1	f	jr9ds9fyu	f	g552ju164	
d26idc80q	מיץ לימון יכין 4 ליטר 33057	1	f	jr9ds9fyu	f	n1c77r0fr	\N
5slx186f2	מים קטן	1	f	jr9ds9fyu	f	g552ju164	\N
y8xkzx789	בצל יבש	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
giddtc3de	קטשופ	1	f	jr9ds9fyu	f	n1c77r0fr	\N
1nexe1b11	קרוטונים	3	f	jr9ds9fyu	f	gxq0ef4dm	\N
o4dv4cnux	אבקת שום	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
6usfnb5x8	לביבות בטטה	1	t	729pzy794	f	\N	קרטון
bdemm1q6x	סלק מבושל 2.5 ק"ג	1	t	jr9ds9fyu	t	4mu0qigjm	\N
ge7ak9wrw	צלחות 750 CC	1	f	60o0slea7	f	\N	קרטון
pt8btchup	מכסה למרקיות 500CC	1	f	60o0slea7	f	\N	קרטון
4y0vm4if6	מכסה לירושלמי 500CC 	1	f	60o0slea7	f	\N	קרטון
anfsgr5z2	סלק	100	f	w5ebn7oj3	f	fwryp47l0	\N
pzt06yjjb	עגבניה	2	f	w5ebn7oj3	f	fwryp47l0	\N
lwhz9k69a	מלפפון	1	f	w5ebn7oj3	f	fwryp47l0	\N
lgaowj9xd	גמבה	1	f	w5ebn7oj3	f	fwryp47l0	\N
di5o26ivj	גזר	1	f	w5ebn7oj3	f	fwryp47l0	\N
pa9d63sz4	כרוב לבן	1	f	w5ebn7oj3	f	fwryp47l0	\N
ybiep9045	בצל ירוק	5	f	w5ebn7oj3	f	st4ztd9ij	\N
1clmn3vx8	נבטים	2	f	w5ebn7oj3	f	st4ztd9ij	\N
we95w4udl	טחינה 3 ק"ג 14003	1000	f	jr9ds9fyu	f	vjrjhal7r	\N
2d17y9mni	חומוס עדן A2 זול	1	f	jr9ds9fyu	f	4mu0qigjm	יח
x2lsuw4gw	פסטה 5 קג צבעונית 33124	1	f	jr9ds9fyu	f	gxq0ef4dm	\N
njzi68ko9	חמוציות 55003	1	f	jr9ds9fyu	f	nxiztiah1	\N
1z4jgraja	שקית בתאבון 50*25 331187	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
42cps0vof	נייר רץ-רץ	100	f	jr9ds9fyu	f	u7fjjvqh6	יח
otoi2viqh	כמון	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
wk4mmyv1z	מלח מנות	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
u5igyxlvn	פיוז טי 0.5	1100	f	jr9ds9fyu	f	g552ju164	\N
iu0w9sydh	רוטב צילי חריף 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
73sf48mpv	שעועית לבנה 5 קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
23813t7x1	בוטנים	1	f	jr9ds9fyu	f	nxiztiah1	קילו
fha78q52f	שמן זית מעורב 4 ליטר 10007	1	t	jr9ds9fyu	t	vjrjhal7r	ליטר
smz1xm0r7	 זיתים טבעות ירוק 9ליטר 12050	1	t	jr9ds9fyu	t	4mu0qigjm	\N
1sd8ksiia	מיץ לימון אסיס 2 ליטר 109356082	1	t	jr9ds9fyu	t	n1c77r0fr	\N
i1s10csa5	ספרייט זירו בקבוק 0.5	1	t	jr9ds9fyu	t	g552ju164	
be7xduupm	ניר סנדוויץ	1	f	60o0slea7	f	\N	קרטון
l7dhfsoa2	נייר לקופה טרמי 80	1	f	60o0slea7	f	\N	שרבול
yxvciok4a	נייר טרמי 80 10111	3	f	jr9ds9fyu	f	u7fjjvqh6	\N
sqhnr83of	שקיות ארומה	1	f	jr9ds9fyu	f	u7fjjvqh6	יח
82qitxtd8	מיונז דלי 5 קג	2	f	jr9ds9fyu	f	n1c77r0fr	\N
nnn2ymb1l	רוטב בלסמי 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
ufcrscph9	סינר	1	f	jr9ds9fyu	f	u7fjjvqh6	 יח
7nhqr8mhr	בירה שחורה 0.33	1	f	jr9ds9fyu	f	g552ju164	\N
sahtyd1ku	נוזל לניקוי רצפות 4 ליטר 15228	1	f	jr9ds9fyu	f	20675h0be	\N
254d3wcyg	פסטה אטריות	1	f	jr9ds9fyu	f	gxq0ef4dm	\N
202x1k7xl	אורגנו 80002	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
e17jgxska	סוכר מנות	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
z0k13l9rk	קשיו טבעי 24037	1	f	jr9ds9fyu	f	nxiztiah1	\N
4ax2uob7i	שקד טבעי 1 קג	1	f	jr9ds9fyu	f	nxiztiah1	\N
14t61uh3j	אגוז מלך 1 קג	1000	f	jr9ds9fyu	f	nxiztiah1	\N
g9uyfw7p0	מסיר שומנים 4 ליטר	1000	f	jr9ds9fyu	f	20675h0be	\N
4qn0wra3h	כרוב כבוש	1	f	jr9ds9fyu	f	4mu0qigjm	יח
u4b1yk4ad	גריסים פנינה 5קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
xqayjdiq9	חמאה מנות	1	f	jr9ds9fyu	f	vjrjhal7r	\N
rgcoh6mz5	כורכום	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
wtc42wdca	קוסקוס 5 קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
au85ukox0	פלפל חלופיניו פרוס ירוק A10	2	f	jr9ds9fyu	f	4mu0qigjm	יח
iidr21n69	גבינה מגורדת	1	f	jr9ds9fyu	f	vjrjhal7r	קילו
ssedmlxd3	זתר	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
3y5cylee3	כוסות 0.5	1	f	60o0slea7	f	\N	שרבול
bv5wfe3bl	שקיות בתאבון	1	f	60o0slea7	f	\N	חבילה
dw1qe4n1t	כוסות 0.3	3	f	60o0slea7	f	\N	שרבול
hz8oowj2i	כוסות 0.25	3	f	60o0slea7	f	\N	שרבול
11smropz1	המבורגר עדשים	1	f	729pzy794	f	\N	קרטון
p3rjkowen	אספרסו גרעינים 1 ק"ג 60017	1	f	jr9ds9fyu	f	nxiztiah1	\N
8g9h4yhpe	פתיתים	6	f	jr9ds9fyu	f	gxq0ef4dm	יח
8e1704vju	ויניגרט 4 ליטר	1	f	jr9ds9fyu	f	n1c77r0fr	\N
vjx5wdzn6	פלפל שחור גרוס 19224	1	f	jr9ds9fyu	f	kv1nwfn3h	\N
5t5z6kc7s	נייר פרגמנט נשלף בקרטון	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
jqz12dgd8	כפות מרק קשיח	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
ibo8i8p7j	טבעות שחור 9 ליטר 12051	1	f	jr9ds9fyu	f	4mu0qigjm	\N
tiv6oy0ms	קשיח סכין	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
spsbdmb63	תערובת פרוסות ירקות חמוצים	2	f	jr9ds9fyu	f	4mu0qigjm	יח
f2po9xzx7	לימון כבוש	1	f	jr9ds9fyu	f	n1c77r0fr	יח
63vhnqsfw	עדשים שחורות 5 קג	1	f	jr9ds9fyu	f	78vwy07mc	\N
dp7tl3nbp	אטריות שעועית	6	f	jr9ds9fyu	f	gxq0ef4dm	\N
rocrd1u0x	מגבות חוגלה 1183	1	f	jr9ds9fyu	f	u7fjjvqh6	\N
dznyhicsp	רוטב טריאקי 4 ליטר	1	t	jr9ds9fyu	t	n1c77r0fr	\N
s4fgrahfq	סומסום 	1	t	jr9ds9fyu	t	nxiztiah1	קילו
c20z40tjz	גאלה לסלט	1	t	jr9ds9fyu	t	nxiztiah1	יח
\.


--
-- Data for Name: phone_numbers; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.phone_numbers (id, name, number, type, list_id) FROM stdin;
056583fc-5d5d-44e9-ad11-26e177b56ef4	עואד	050-845-5972	sms	sapnkd5s2
c7e8f8c4-16ca-4955-be1a-926f46b56b9b	אבי	052-357-8997	sms	9l26gjtz4
2bb6b88b-cf0f-4f56-9685-2a2e12f904e9	צביקה	050-538-8227	sms	30xf4uvwr
66df876f-14df-462d-8193-69b700388a86	טל	0528051717	sms	729pzy794
056583fc-5d5d-44e9-ad11-2bb6b88b44e9	טסט	0547651831	sms	idt5et80n
d30edd7f-7ac3-4c48-bbf5-efd0d5f015f2	איתן	0526652020	sms	60o0slea7
04bd8dd6-71e9-41f7-b298-1ae5547ba341	מנסור	0507370090	sms	w5ebn7oj3
\.


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.user_account (id, name, login, email, password, enable) FROM stdin;
67e99f00ee1111ea9faf03b4e29d410b	undefined	undefined	undefined	$2a$10$eWEcFwCfnXQ113pN.JtPOOQ2OrK7naoYslo6wT8sfX3pB.oPnnsvC	t
\.


--
-- Data for Name: users_lists; Type: TABLE DATA; Schema: public; Owner: manager
--

COPY public.users_lists (user_id, list_id, ownership) FROM stdin;
\.


--
-- Name: user_account_email_key; Type: CONSTRAINT; Schema: public; Owner: manager
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_email_key UNIQUE (email);


--
-- Name: user_account_login_key; Type: CONSTRAINT; Schema: public; Owner: manager
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_login_key UNIQUE (login);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

